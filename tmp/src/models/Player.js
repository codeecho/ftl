import Weapon from './Weapon';
import Armour from './Armour';

export default class Player{
    
    constructor(name){
        this.id = Math.random();
        this.name = name;
        this.ai = true;
        this.maxHealth = 100;
        this.attack = 100;
        this.defense = 100;
        this.weapon = new Weapon('', undefined, 1.2)
        this.armour = new Armour('', undefined, 1.2, 1)    
        this.magicAttack = 100;
        this.magicDefense = 10;
        this.speed = 50;
        this.maxMagicPoints = 100;
        this.magicSpeed = 10;
        this.spells = [];
        this.relics = [];
        this.element = undefined;
    }
    
}