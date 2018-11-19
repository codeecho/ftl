import {ELEMENTAL, PHYSICAL, HEALING, MODIFIER, STATUS, COMBO} from '../constants/spell-types';
import {ALLIES, ENEMY} from '../constants/target-types';

export default class Spell{
    
    constructor(name, description, type, target, cost){
        this.name = name;
        this.description = description;
        this.type = type;
        this.target = target;
        this.cost = cost;
    }
    
}

export class Physical extends Spell{
    
    constructor(name, description, cost, modifier = 1, element){
        super(name, description, PHYSICAL, ENEMY, cost);
        this.modifier = modifier;
        this.element = element;
    }
    
}

export class Elemental extends Spell{
    
    constructor(name, description, element, cost, modifier = 1){
        super(name, description, ELEMENTAL, ENEMY, cost);
        this.element = element;
        this.modifier = modifier;
    }
    
}

export class Healing extends Spell{
    
    constructor(name, description, cost, strength){
        super(name, description, HEALING, ALLIES, cost);
        this.strength = strength;
    }
    
}

export class Modifier extends Spell{
    
    constructor(name, description, cost, target, property, modifier){
        super(name, description, MODIFIER, target, cost);
        this.property = property;
        this.modifier = modifier;
    }
    
}

export class StatusSpell extends Spell{
    
    constructor(name, description, cost, status, strength = 1, turns = 1){
        super(name, description, STATUS, status.target, cost);
        this.status = status;
        this.strength = strength;
        this.turns = turns;
    }
    
}

export class ComboSpell extends Spell{

    constructor(name, description, target, cost, spells){
        super(name, description, COMBO, target, cost);
        this.spells = spells;
    }

}