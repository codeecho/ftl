import{
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
} from './demo/spells';

export const warrior = {
    id: 1,
    name: 'Warrior',
    gender: 'male',
    training: {
        attack: 1.25,
        defense: 1.2,
        magicAttack: 0.7,
        magicDefense: 0.9,
        speed: 0.95
    },
    images: [
        'assets/warrior.jpg'
    ],
    primarySpells:[
        fists,
        sonic,
        tiger,
        dragon,
        rage,
        firefist,
        iceSlash,
        hKick,
        rockSmash,
        lSlash
    ],
    secondarySpells:[
    
    ]
}

export const paladin = {
    id: 2,
    name: 'Paladin',
    gender: 'male',    
    training: {
        attack: 1,
        defense: 1,
        magicAttack: 1,
        magicDefense: 1,
        speed: 1
    },
    images: [
        'assets/paladin.jpg'
    ],
    primarySpells:[
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
    ],
    secondarySpells:[
        
    ]
}

export const mage = {
    id: 3,
    name: 'Mage',
    gender: 'male',    
    training: {
        attack: 0.7,
        defense: 1.15,
        magicAttack: 0.9,
        magicDefense: 1.25,
        speed: 1
    },
    images: [
        'assets/mage.jpg'
    ],
    primarySpells: [
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
        breach
    ],
    secondarySpells: [
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
        drain,
        mystic,
        shadow,
        energy,
        focus
    ]
}

export const fairy = {
    id: 4,
    name: 'Fairy',
    gender: 'female',    
    training: {
        attack: 0.7,
        defense: 1.15,
        magicAttack: 0.9,
        magicDefense: 1.25,
        speed: 1
    },
    images: [
        'assets/fairy.jpg'
    ],
    primarySpells: [
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
        breach
    ],
    secondarySpells: [
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
        drain,
        mystic,
        shadow,
        energy,
        focus
    ]
}

export const walock = {
    id: 5,
    name: 'Warlock',
    gender: 'male',    
    training: {
        attack: 0.9,
        defense: 0.9,
        magicAttack: 1.2,
        magicDefense: 1.1,
        speed: 0.9
    },
    images: [
        'assets/warlock.jpg'
    ],
    primarySpells: [
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
        drain,
        mystic,
        shadow,
        energy,
        focus
    ],
    secondarySpells: [
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
        breach
    ]
}

export const sorceress = {
    id: 6,
    name: 'Sorceress',
    gender: 'female',    
    training: {
        attack: 0.9,
        defense: 0.9,
        magicAttack: 1.2,
        magicDefense: 1.1,
        speed: 0.9
    },
    images: [
        'assets/sorceress.jpg'
    ],
    primarySpells: [
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
        drain,
        mystic,
        shadow,
        energy,
        focus
    ],
    secondarySpells: [
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
        breach
    ]
}

export const ranger = {
    id: 7,
    name: 'Ranger',
    gender: 'male',    
    training: {
        attack: 1.2,
        defense: 1,
        magicAttack: 0.7,
        magicDefense: 0.9,
        speed: 1.2
    },
    images: [
        'assets/ranger.jpg'
    ],primarySpells:[
        fists,
        sonic,
        tiger,
        dragon,
        rage,
        firefist,
        iceSlash,
        hKick,
        rockSmash,
        lSlash
    ],
    secondarySpells:[
    
    ]
}

export const hunter = {
    id: 8,
    name: 'Hunter',
    gender: 'male',    
    training: {
        attack: 1.05,
        defense: 0.95,
        magicAttack: 0.9,
        magicDefense: 0.95,
        speed: 1.15
    },
    images: [
        'assets/hunter.jpg'
    ],
    primarySpells:[
        fists,
        sonic,
        tiger,
        dragon,
        rage,
        firefist,
        iceSlash,
        hKick,
        rockSmash,
        lSlash
    ],
    secondarySpells:[
    
    ]
}

export const fwarrior = {
    id: 9,
    name: 'Warrior',
    gender: 'female',
    training: {
        attack: 1.25,
        defense: 1.2,
        magicAttack: 0.7,
        magicDefense: 0.9,
        speed: 0.95
    },
    images: [
        'assets/warrior-f.png'
    ],
    primarySpells:[
        fists,
        sonic,
        tiger,
        dragon,
        rage,
        firefist,
        iceSlash,
        hKick,
        rockSmash,
        lSlash
    ],
    secondarySpells:[
    
    ]
}

export const franger = {
    id: 10,
    name: 'Ranger',
    gender: 'female',    
    training: {
        attack: 1.2,
        defense: 1,
        magicAttack: 0.7,
        magicDefense: 0.9,
        speed: 1.2
    },
    images: [
        'assets/ranger-f.jpg'
    ],
    primarySpells:[
        fists,
        sonic,
        tiger,
        dragon,
        rage,
        firefist,
        iceSlash,
        hKick,
        rockSmash,
        lSlash
    ],
    secondarySpells:[
    
    ]
}