import {MODIFIER} from '../constants/spell-types';

export default class Status{
    
    constructor(id, name, description){
        this.id = id;
        this.name = name;
        this.description = description;
    }
    
}

export class ModifierStatus extends Status{
    
    constructor(id, name, description, property){
        super(id, name, description);
        this.type = MODIFIER;
        this.property = property;
    }
    
}