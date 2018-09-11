import Weapon from './Weapon';
import Armour from './Armour';

export default class Player{
    
    constructor(name){
        this.name = name;
        this.ai = true;
        this.maxHealth = 100;
        this.attack = 50;
        this.defense = 50;
        this.weapon = new Weapon('', undefined, 1.2)
        this.armour = new Armour('', undefined, 1.2, 1)    
        this.magicAttack = 50;
        this.magicDefense = 50;
        this.speed = 50;
        this.spells = [];
        this.relics = [];
        this.element = undefined;
    }
    
}