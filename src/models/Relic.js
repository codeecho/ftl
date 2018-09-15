import {MODIFIER} from '../constants/spell-types';

export default class Relic{
    
    constructor(type, name){
        this.type = type;
        this.name = name;
    }
    
}

export class ModifierRelic extends Relic{
    
    constructor(name, property, modifier){
        super(MODIFIER, name);
        this.property = property;
        this.modifier = modifier;
    }
    
}