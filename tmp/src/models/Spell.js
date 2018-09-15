import {ELEMENTAL, HEALING, MODIFIER, STATUS} from '../constants/spell-types';
import {ALLIES, ENEMY} from '../constants/target-types';

export default class Spell{
    
    constructor(name, type, target, cost){
        this.name = name;
        this.type = type;
        this.target = target;
        this.cost = cost;
    }
    
}

export class Elemental extends Spell{
    
    constructor(name, element, cost, modifier = 1){
        super(name, ELEMENTAL, ENEMY, cost);
        this.element = element;
        this.modifier = modifier;
    }
    
}

export class Healing extends Spell{
    
    constructor(name, cost, strength){
        super(name, HEALING, ALLIES, cost);
        this.strength = strength;
    }
    
}

export class Modifier extends Spell{
    
    constructor(name, cost, target, property, modifier){
        super(name, MODIFIER, target, cost);
        this.property = property;
        this.modifier = modifier;
    }
    
}

export class StatusSpell extends Spell{
    
    constructor(name, cost, target, status, strength = 1){
        super(name, STATUS, target, cost);
        this.status = status;
        this.strength = strength;
    }
    
}