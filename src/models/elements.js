class Element{
    constructor(id, name, weakness){
        this.id;
        this.name = name;
        this.weakness = weakness;
    }
    
    isWeakAgainst(element){
        return element && this.weakness === element.id;
    }
    
    isEffectiveAgainst(element){
        return element && element.isWeakAgainst(this);
    }
}

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