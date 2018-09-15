import {START, END, WAIT, ATTACK, INPUT, MAGIC} from '../constants/event-types';
import {ELEMENTAL, HEALING, MODIFIER, STATUS} from '../constants/spell-types';
import {ALLIES, ENEMY} from '../constants/target-types';

import Randomizer from '../utils/Randomizer';

const WAIT_THRESHOLD = 100;

export default class Battle{
    
    constructor(t1, t2){
        this.randomizer = new Randomizer();
        
        const [team1, team2] = [t1, t2].map(t => {
            const team = Object.assign({}, t);
            team.players = team.players.map(p => {
                return {
                    ...p,
                    attack: p.attack * p.weapon.modifier,
                    defense: p.defense * p.armour.modifier,
                    magicDefense: p.magicDefense * p.armour.magicModifier,
                    health: p.maxHealth,
                    magicPoints: Math.floor(p.maxMagicPoints/2),
                    wait: this.randomizer.getRandomInteger(10, 60),
                    alive: true,
                    acted: false,
                    statuses: [],
                    realAttack: 0,
                    realDefense: 0,
                    realMagicAttack: 0,
                    realMagicDefense: 0,
                    realSpeed: 0,
                    realMagicSpeed: 0
                };
            });
            return team;
        });
        this.team1 = team1;
        this.team2 = team2;
        this.started = false;
        this.complete = false;
        
        this.team1.players.concat(this.team2.players).forEach(player => {
            player.relics.forEach(relic => {
                if(relic.type === MODIFIER){
                    player[relic.property] = player[relic.property] * relic.modifier;
                }     
            });
        });
    }
    
    execute(){
        let events = [];
        while(true){
            const event = this.tick();
            if(event){
                events.push(event);
                if(event.type === END || event.type === INPUT) break;
            };
        }
        console.log(events);
        return events;
    }
    
    tick(){
        
        if(!this.started) {
            this.started = true;
            return this.buildEvent({type: START});
        }
        
        if(this.complete) return this.buildEvent({type: END});
        
        this.applyStatuses();
        
        let event = this.takeTurn(this.team1, this.team2);
        
        if(event) return event;
        
        event = this.takeTurn(this.team2, this.team1);
        
        if(event) return event;
        
        this.advanceWait();
        
        return this.buildEvent({type: WAIT});
    }
    
    applyStatuses(){
        this.team1.players.concat(this.team2.players).filter(player => player.alive).forEach(player => {
            player.realAttack = player.attack;
            player.realDefense = player.defense;
            player.realMagicAttack = player.magicAttack;
            player.realMagicDefense = player.magicDefense;
            player.realSpeed = player.speed;
            player.realMagicSpeed = player.magicSpeed;
            
            player.statuses.forEach(status => {
                if(status.type === MODIFIER){
                    const property = 'real' + status.property.substring(0,1).toUpperCase() + status.property.substring(1);
                    player[property] = player[property] * status.strength;
                }
            })
            
        });
    }
    
    takeTurn(attackingTeam, defendingTeam){        
        const attackers = attackingTeam.players.filter(player => player.alive && !player.acted && player.wait >= WAIT_THRESHOLD);
        if(attackers.length === 0) return;
        const attacker = attackers[0];
        return this.act(attacker, attackingTeam, defendingTeam);
    }
    
    act(attacker, attackingTeam, defendingTeam){
        const targets = defendingTeam.players.filter(player => player.alive);
        const allies = attackingTeam.players.filter(player => player.alive);
        
        if(!attacker.ai) return this.buildEvent({
           type: INPUT,
           attacker,
           targets,
           allies
        });
        
        let target = this.randomizer.getRandomItem(targets);
        
        const spells = attacker.spells.filter(spell => spell.cost <= attacker.magicPoints);
        
        const useMagic = spells.length > 0 && this.randomizer.getRandomBoolean();
        
        if(useMagic){
            const spell = this.randomizer.getRandomItem(spells);
            if(spell.target === ALLIES){
                target = this.randomizer.getRandomItem(allies);
            }
            return this.castSpell(attacker, target, spell);
        }
        
        return this.attack(attacker, target);
    }
    
    attack(attacker, target){
        const attackRating = attacker.realAttack;
        const defenseRating = target.realDefense;
        let damage = this.calculateDamage(attackRating, defenseRating);
        const weak = attacker.weapon.element && isElementWeakAgainst(attacker.weapon.element, target.element);
        const effective = attacker.weapon.element && !isElementWeakAgainst(attacker.weapon.element, target.armour.element) && isElementEffectiveAgainst(attacker.weapon.element, target.element);
        if(effective) damage *= 1.5;
        if(weak) damage *= 0.5;
        const ko = this.applyDamage(target, damage);
        attacker.acted = true;        
        return this.buildEvent({
            type: ATTACK,
            attacker,
            target,
            damage,
            ko,
            effective,
            weak
        });
    }
    
    castSpell(caster, target, spell){
        caster.magicPoints -= spell.cost;
        caster.acted = true;
        switch (spell.type) {
        	case HEALING:
        		return this.castHealing(caster, target, spell);
        	case ELEMENTAL:
        	   return this.castElemental(caster, target, spell);
        	case MODIFIER:
        	   return this.castModifier(caster, target, spell);
        	case STATUS: 
        	   return this.castStatusSpell(caster, target, spell);
        }             
    }
    
    castHealing(caster, target, spell){
        let delta = caster.realMagicAttack * spell.strength;
        delta = this.randomizer.getRandomDeviatedInteger(delta, 0.1);
        target.health = Math.min(target.health + delta, target.maxHealth);
        return this.buildEvent({
            type: MAGIC,
            magicType: HEALING,
            caster,
            target,
            spell,
            delta,
        });
    }
    
    castElemental(attacker, target, spell){
        let attackPower = attacker.realMagicAttack;
        if(spell.modifier) attackPower = attackPower * spell.modifier;
        let damage = this.calculateDamage(attackPower, target.realMagicDefense);
        const weak = spell.element && isElementWeakAgainst(spell.element, target.element);
        const effective = spell.element && !isElementWeakAgainst(spell.element, target.armour.element) && isElementEffectiveAgainst(spell.element, target.element);
        if(effective) damage *= 1.5;
        if(weak) damage *= 0.5;
        const ko = this.applyDamage(target, damage);
        return this.buildEvent({
            type: MAGIC,
            magicType: ELEMENTAL,            
            attacker,
            target,
            spell,
            damage,
            ko,
            effective,
            weak
        });  
    }
    
    castModifier(caster, target, spell){
        const delta = (target[spell.property] * spell.modifier) - target[spell.property];
        target[spell.property] = target[spell.property] + delta;
        return this.buildEvent({
            type: MAGIC,
            magicType: MODIFIER,            
            caster,
            target,
            spell,
            delta
        });  
    }
    
    castStatusSpell(caster, target, spell){
        const status = {
            strength: spell.strength,
            ...spell.status
        }
        target.statuses = target.statuses.filter(s => s.id !== status.id).concat(status);
        return this.buildEvent({
            type: MAGIC,
            magicType: STATUS,            
            caster,
            target,
            spell
        });  
    }
    
    calculateDamage(attackRating, defenseRating){
        let damage = ((attackRating * 3) - defenseRating) / 10;
        damage = this.randomizer.getRandomDeviatedInteger(damage, 0.1);
        return damage;
    }
    
    applyDamage(target, damage){
        target.health = Math.max(target.health - damage, 0);
        const ko = target.health <= 0;
        if(ko) {
            target.alive = false;
        }
        this.checkForVictory();
        return ko;
    }
    
    advanceWait(){
        const players = [this.team1, this.team2].reduce((players, team) => players.concat(team.players), []);
        players.filter(player => player.alive).forEach(player => {
            player.acted = false;
            if(player.wait >= WAIT_THRESHOLD) player.wait = 0;
            else player.wait = Math.min(player.wait + (player.realSpeed / 10), WAIT_THRESHOLD);
            player.magicPoints = Math.min(player.magicPoints + (player.magicSpeed/10), player.maxMagicPoints);
        });
    }
    
    checkForVictory(){
        if(!this.team1.players.find(player => player.alive)){
            this.complete = true;
            this.winner = this.team2;
        }else if(!this.team2.players.find(player => player.alive)){         
            this.complete = true;
            this.winner = this.team1;
        }
    }
    
    buildEvent(data){
        return Object.assign({}, data, {state: this.getState()});
    }
    
    getState(){
        return {
            team1: cloneTeam(this.team1),
            team2: cloneTeam(this.team2),            
            complete: this.complete,
            winner: this.winner
        };
    }
    
}

function cloneTeam(team){
    const players = team.players.map(player => Object.assign({}, player));
    return Object.assign({}, team, {players});
}

function isElementWeakAgainst(e1, e2){
    return e2 && e1.weakness === e2.id;
}

function isElementEffectiveAgainst(e1, e2){
    return e2 && isElementWeakAgainst(e2, e1);
}