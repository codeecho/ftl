import Relic, {ModifierRelic} from '../../models/Relic';

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