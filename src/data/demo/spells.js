import Spell, {Elemental, Healing, StatusSpell, Physical, ComboSpell} from '../../models/Spell';
import {ALLIES, ENEMY} from '../../constants/target-types';

import {fire, water, wind, earth, lightning} from './elements';
import {
    speedUp,
    speedDown,
    attackUp,
    attackDown,
    defenseUp,
    defenseDown,
    magicAttackUp,
    magicAttackDown,
    magicDefenseUp,
    magicDefenseDown
} from './statuses';

export const flame = new Elemental('Flame', 'Fire elemental attack', fire, 30);
export const aqua = new Elemental('Aqua Blast', 'Water elemental attack', water, 30);
export const vortex = new Elemental('Vortex', 'Wind elemental attack', wind, 30);
export const boulder = new Elemental('Boulder', 'Earth elemental attack', earth, 30);
export const shock = new Elemental('Shock', 'Lightning elemental attack', lightning, 30);

export const fireball = new Elemental('Fireball', 'Fire elemental attack', fire, 60, 2);
export const ice = new Elemental('Ice Blast', 'Water elemental attack', water, 60, 2);
export const tornado = new Elemental('Tornado', 'Tornado elemental attack', wind, 60, 2);
export const rock = new Elemental('Rock Shower', 'Earth elemental attack', earth, 60, 2);
export const bolt = new Elemental('Bolt', 'Lightning elemental attack', lightning, 60, 2);

export const heal = new Healing('Heal', 'Restore HP', 40, 1);

export const quick = new StatusSpell('Quick', 'Increases Speed by 50%', 20, speedUp, 1.5, 3);
export const boost = new StatusSpell('Boost', 'Increases Attack by 50%', 40, attackUp, 1.5, 3);
export const shield = new StatusSpell('Shield', 'Increases Defense by 50%', 40, defenseUp, 1.5, 3);
export const spirit = new StatusSpell('Spirit', 'Increases Spirit by 50%', 40, magicAttackUp, 1.5, 3);
export const barrier = new StatusSpell('Barrier', 'Increases Barrier by 50%', 40, magicDefenseUp, 1.5, 3);

export const slow = new StatusSpell('Slow', 'Decreases Speed by 50%', 20, speedDown, 0.5, 3);
export const weaken = new StatusSpell('Weaken', 'Decreases Attack by 50%', 40, attackDown, 0.5, 3);
export const expose = new StatusSpell('Expose', 'Decreases Defense by 50%', 40, defenseDown, 0.5, 3);
export const curse = new StatusSpell('Curse', 'Decreases Spirit by 50%', 40, magicAttackDown, 0.5, 3);
export const breach = new StatusSpell('Breach', 'Decreases Barrier by 50%', 40, magicDefenseDown, 0.5, 3);

export const firefist = new Physical('Fire Fist', 'Physical fire elemental attack', 30, 1, fire);
export const iceSlash = new Physical('Ice Slash', 'Physical water elemental attack', 30, 1, water);
export const hKick = new Physical('Hurricane Kick', 'Physical wind elemental attack', 30, 1, wind);
export const rockSmash = new Physical('Rock Smash', 'Physical earth elemental attack', 30, 1, earth);
export const lSlash = new Physical('Lightning Slash', 'Physical lightning elemental attack', 30, 1, lightning);

const physical1 = new Physical('', '', 0, 1.5);
const magic1 = new Elemental('', '', undefined, 0, 1);

export const fists = new ComboSpell('Fists of Fury', 'Physical attack which decreases targets Defense by 50%', ENEMY, 40, [physical1, expose]);
export const sonic = new ComboSpell('Sonic Uppercut', 'Physical attack which decreases targets Speed by 50%', ENEMY, 40, [physical1, slow]);
export const tiger = new ComboSpell('Tiger Frenzy', 'Physical attack which increases attackers Spirit by 50%', ENEMY, 40, [physical1, spirit]);
export const dragon = new ComboSpell('Dragon Fury', 'Physical attack which decreases targets Barrier by 50%', ENEMY, 40, [physical1, breach]);
export const rage = new ComboSpell('Raging Fist', 'Physical attack which increases attackers Attack by 50%', ENEMY, 40, [physical1, boost]);

export const drain = new ComboSpell('Drain', 'Magic attack which restores attackers HP', ENEMY, 40, [magic1, heal]);
export const mystic = new ComboSpell('Mystic Flare', 'Magic attack which decreases targets MP', ENEMY, 40, [magic1]);
export const shadow = new ComboSpell('Shadow Strike', 'Magic attack which increases attackers Barrier', ENEMY, 40, [magic1, barrier]);
export const energy = new ComboSpell('Energy Surge', 'Magic attack which increases attackers Spirit', ENEMY, 40, [magic1, spirit]);
export const focus = new ComboSpell('Focus', 'Increases MP recovery time', ENEMY, 0, []);

const spells = [
    flame,
    aqua,
    vortex,
    boulder,    
    shock,    
    
    fireball,
    ice,
    tornado,
    rock,
    bolt,
    
    heal,
    
    quick,
    boost,
    shield,
    spirit,
    barrier,
    
    slow,
    weaken,
    expose,
    curse,
    breach,
    
    fists,
    sonic,
    tiger,
    dragon,
    rage,
    
    drain,
    mystic,
    shadow,
    energy,
    focus,
    
    firefist,
    iceSlash,
    hKick,
    rockSmash,
    lSlash
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