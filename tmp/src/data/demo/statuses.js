import Status, {ModifierStatus} from '../../models/Status';

export const speedUp = new ModifierStatus('speedUp', 'Speed Up', 'Speed has increased', 'speed');
export const speedDown = new ModifierStatus('speedDown', 'Speed Down', 'Speed has descreased', 'speed');

export const attackUp = new ModifierStatus('attackUp', 'Attack Up', 'Attack has increased', 'attack');
export const defenseUp = new ModifierStatus('defenseUp', 'Defense Up', 'Defense has increased', 'defense');

export const magicAttackUp = new ModifierStatus('magicAttackUp', 'Magic Attack Up', 'Magic Attack has increased', 'magicAttack');
export const magicDefenseUp = new ModifierStatus('magicDefenseUp', 'Magic Defense Up', 'Magic Defense has increased', 'magicDefense');

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