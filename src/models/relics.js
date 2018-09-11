class Relic{
    
    constructor(type, name){
        this.type = type;
        this.name = name;
    }
    
}

class ModifierRelic extends Relic{
    
    constructor(name, property, modifier){
        super('modifier', name);
        this.property = property;
        this.modifier = modifier;
    }
    
}

const speedStone = new ModifierRelic('Speed Stone', 'speed', 1.5);
const heroStone = new ModifierRelic('Hero Stone', 'attack', 1.5);
const shieldStone = new ModifierRelic('Shield Stone', 'defense', 1.5);
const wizardStone = new ModifierRelic('Wizard Stone', 'magicAttack', 1.5);
const barrierStone = new ModifierRelic('Barrier Stone', 'magicDefense', 1.5);

const relics = [
    speedStone,
    heroStone,
    shieldStone,
    wizardStone,
    barrierStone
];

export default relics;