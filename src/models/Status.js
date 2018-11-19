import {MODIFIER} from '../constants/spell-types';

export default class Status{
    
    constructor(id, name, description, target){
        this.id = id;
        this.name = name;
        this.description = description;
        this.target = target;
    }
    
}

export class ModifierStatus extends Status{
    
    constructor(id, name, description, target, property){
        super(id, name, description, target);
        this.type = MODIFIER;
        this.property = property;
    }
    
}