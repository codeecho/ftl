import Randomizer from '../utils/Randomizer';
import maleNames from '../data/male-names.json';
import femaleNames from '../data/female-names.json';
import surnames from '../data/surnames.json';
import PlayerService from './PlayerService';
import * as playerTypes from '../data/character-types';
import elements from '../data/elements';

import {UNDRAFTED_TEAM_ID, XP_PER_GAME, GAMES_PER_SEASON} from '../constants';

const firstNames = {
    male: maleNames,
    female: femaleNames
};

export default class PlayerBuilder{
    
    constructor(randomizer){
        this.randomizer = randomizer || new Randomizer();
        this.playerService = new PlayerService();
    }
    
    generateName(gender){
        const firstName = this.randomizer.getRandomItem(firstNames[gender]);   
        const surname = this.randomizer.getRandomItem(surnames);
        return firstName + ' ' + surname;
    }
    
    getSpells(characterType){
        let primarySpells = characterType.primarySpells.concat();
        let secondarySpells = primarySpells.concat(characterType.secondarySpells);
        let spells = [];
        for(let i=0; i<6; i++){
            const takePrimarySpell = this.randomizer.getRandomBoolean(0.9);
            const possibleSpells = takePrimarySpell ? primarySpells : secondarySpells;
            const spell = this.randomizer.getRandomItem(possibleSpells);
            spells.push({
                spell,
                learnt: false,
                xp: 0
            });
            primarySpells = primarySpells.filter(x => x !== spell);
            secondarySpells = secondarySpells.filter(x => x !== spell);            
        }
        spells = this.randomizer.randomizeArray(spells);
        spells[0].learnt = true;
        return spells;
    }
    
    buildBasePlayer(year, id, teamId){
        const age = 18;
        const dob = year - age - 1;
        
        const type = this.randomizer.getRandomItem(Object.values(playerTypes));
        
        const name = this.generateName(type.gender);
        
        const potential = this.randomizer.getTargetedRandomInteger(45, 85, 65, 3);
        const ability = this.randomizer.getTargetedRandomInteger(Math.max(40, potential - 30), Math.min(potential - 5, 60), 50);
        const prime = this.randomizer.getRandomInteger(26, 30);
        const decline = this.randomizer.getTargetedRandomInteger(2, 8, 5);
        
        const trainingRegime = type.training;
        
        const attack = ability * trainingRegime.attack;
        const defense = ability * trainingRegime.defense;
        const magicAttack = ability * trainingRegime.magicAttack;
        const magicDefense = ability * trainingRegime.magicDefense;
        const speed = ability * trainingRegime.speed;   
        
        const image = this.randomizer.getRandomItem(type.images);
        
        const spells = this.getSpells(type);
        
        const element = this.randomizer.getRandomItem(elements.concat([undefined, undefined]))
        
        let player = {
            id,
            teamId: teamId,
            name,
            type: type.name,
            dob,
            age,
            contractExpiry: year + this.randomizer.getRandomInteger(0, 3),
            attack: Math.round(attack),
            defense: Math.round(defense),
            magicAttack: Math.round(magicAttack),
            magicDefense: Math.round(magicDefense),
            speed: Math.round(speed),
            draftYear: 1970,
            baseline: ability,
            ability,
            potential,
            trainingRegime,
            prime,
            decline,
            trainingStatus: {
                attack,
                defense,
                magicAttack,
                magicDefense,
                speed,
                ability
            },
            levelUp: false,
            trainingUpdate: {
                attack: 0,
                defense: 0,
                magicAttack: 0,
                magicDefense: 0,
                speed: 0
            },
            image,
            spells,
            element
        }
        
        return player;
    }
    
    buildPlayer(year, id, teamId){
        let player = this.buildBasePlayer(year, id, teamId);
        
        const age = this.randomizer.getTargetedRandomInteger(19, 40, 28);
        
        player = this.playerService.applyProjectedTraining(player, age - 18);
        player.dob = year - player.age - 1;
        
        const salary = this.playerService.calculateExpectedSalary(player);
        return Object.assign({}, player, {salary, expectedSalary: salary});
    }
    
    buildDraftPlayer(year, id, upperBound){
        let player = this.buildBasePlayer(year, id, UNDRAFTED_TEAM_ID);
        
        const age = this.randomizer.getRandomInteger(18, 21);
        
        player = this.playerService.applyProjectedTraining(player, age - 18);
        player.dob = year - player.age - 1;
        
        const expectedSalary = this.playerService.calculateExpectedSalary(player);
        return Object.assign({}, player, {salary: 2, expectedSalary, draftYear: year, contractExpiry: undefined});
    }
}