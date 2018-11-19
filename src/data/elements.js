import Element from '../models/Element';

export const fire = new Element('fire', 'Fire', 'water');
export const water = new Element('water', 'Water', 'lightning');
export const wind = new Element('wind', 'Wind', 'fire');
export const earth = new Element('earth', 'Earth', 'wind');
export const lightning = new Element('lightning', 'Lightning', 'earth');

const elements = [
    fire,
    water,
    wind,
    earth,
    lightning
];

export default elements;