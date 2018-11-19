import Status, {ModifierStatus} from '../../models/Status';
import {ENEMY, ALLIES} from '../../constants/target-types';

export const speedUp = new ModifierStatus('speedUp', 'Speed Up', 'Speed has increased', ALLIES, 'speed');
export const speedDown = new ModifierStatus('speedDown', 'Speed Down', 'Speed has decreased', ENEMY, 'speed');

export const attackUp = new ModifierStatus('attackUp', 'Attack Up', 'Attack has increased', ALLIES, 'attack');
export const attackDown = new ModifierStatus('attackDown', 'Attack Down', 'Attack has decreased', ENEMY, 'attack');

export const defenseUp = new ModifierStatus('defenseUp', 'Defense Up', 'Defense has increased', ALLIES, 'defense');
export const defenseDown = new ModifierStatus('defenseDown', 'Defense Down', 'Defense has decreased', ENEMY, 'defense');

export const magicAttackUp = new ModifierStatus('magicAttackUp', 'Magic Attack Up', 'Magic Attack has increased', ALLIES, 'magicAttack');
export const magicAttackDown = new ModifierStatus('magicAttackDown', 'Magic Attack Down', 'Magic Attack has decreased', ENEMY, 'magicAttack');

export const magicDefenseUp = new ModifierStatus('magicDefenseUp', 'Magic Defense Up', 'Magic Defense has increased', ALLIES, 'magicDefense');
export const magicDefenseDown = new ModifierStatus('magicDefenseDown', 'Magic Defense Down', 'Magic Defense has decreased', ALLIES, 'magicDefense');

//const additionalStatuses = [
//    'poison',
//    'reflect',
//    'marksman',
//    'darkness',
//    'confused',
//    'berserk',
//    'noSpeed',
//    'noMagic',
//    'regen',
//]