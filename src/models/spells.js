import {fire, water, wind, earth, lightning} from './elements';
import {
    speedUp,
    speedDown,
    attackUp,
    defenseUp,
    magicAttackUp,
    magicDefenseUp
} from './statuses';

class Spell{
    
    constructor(name, type, target){
        this.name = name;
        this.type = type;
        this.target = target;
    }
    
}

class Elemental extends Spell{
    
    constructor(name, element, modifier = 1){
        super(name, 'elemental', 'enemy');
        this.element = element;
        this.modifier = modifier;
    }
    
}

export const flame = new Elemental('Flame', fire);
export const fireball = new Elemental('Fireball', fire, 2);
export const ice = new Elemental('Ice', water);
export const hurricane = new Elemental('Hurricane', wind);
export const earthquake = new Elemental('Earthquake', earth);
export const bolt = new Elemental('Bolt', lightning);

class Healing extends Spell{
    
    constructor(name, strength){
        super(name, 'healing', 'allies');
        this.strength = strength;
    }
    
}

export const heal = new Healing('Heal', 0.7);

class Modifier extends Spell{
    
    constructor(name, target, property, modifier){
        super(name, 'modifier', target);
        this.property = property;
        this.modifier = modifier;
    }
    
}

class StatusSpell extends Spell{
    
    constructor(name, target, status, strength = 1){
        super(name, 'status', target);
        this.status = status;
        this.strength = strength;
    }
    
}

export const quick = new StatusSpell('Quick', 'allies', speedUp, 1.5);
export const slow = new StatusSpell('Slow', 'enemy', speedDown, 0.5);
export const hero = new StatusSpell('Hero', 'allies', attackUp, 1.5);
export const shield = new StatusSpell('Shield', 'allies', defenseUp, 1.5);
export const wizard = new StatusSpell('Wizard', 'allies', magicAttackUp, 1.5);
export const barrier = new StatusSpell('Barrier', 'allies', magicDefenseUp, 1.5);

const spells = [
    heal,
    flame,
    fireball,
    ice,
    hurricane,
    earthquake,
    bolt,
    quick,
    slow,
    hero,
    shield,
    wizard,
    barrier
];


// Additional Spells
// revive
// gravity - cut HP by %
// dispel - remove statuses
// Remove individual statuses

//// Relics
// counter attack
// protect against status changes
// adds status change
// protects against element
// boosts attack, defense, magicAttack, magicDefense, speed
// increases max health
// Lowers cost of magic
// improve accuracy
// improve chance of critical hit

export default spells;