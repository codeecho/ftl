import Spell, {Elemental, Healing, StatusSpell} from '../../models/Spell';

import {fire, water, wind, earth, lightning} from './elements';
import {
    speedUp,
    speedDown,
    attackUp,
    defenseUp,
    magicAttackUp,
    magicDefenseUp
} from './statuses';

export const flame = new Elemental('Flame', fire, 30);
export const fireball = new Elemental('Fireball', fire, 60, 2);
export const ice = new Elemental('Ice', water, 30);
export const hurricane = new Elemental('Hurricane', wind, 30);
export const earthquake = new Elemental('Earthquake', earth, 30);
export const bolt = new Elemental('Bolt', lightning, 30);

export const heal = new Healing('Heal', 50, 0.7);

export const quick = new StatusSpell('Quick', 20, 'allies', speedUp, 1.5);
export const slow = new StatusSpell('Slow', 20, 'enemy', speedDown, 0.5);
export const hero = new StatusSpell('Hero', 40, 'allies', attackUp, 1.5);
export const shield = new StatusSpell('Shield', 40, 'allies', defenseUp, 1.5);
export const wizard = new StatusSpell('Wizard', 40, 'allies', magicAttackUp, 1.5);
export const barrier = new StatusSpell('Barrier', 40, 'allies', magicDefenseUp, 1.5);

const spells = [
    heal,
    flame,
    fireball,
    ice,
    hurricane,
    earthquake,
    bolt,
    quick,
    slow,
    hero,
    shield,
    wizard,
    barrier
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