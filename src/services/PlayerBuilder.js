import Randomizer from '../utils/Randomizer';
import firstNames from '../data/first-names.json';
import surnames from '../data/surnames.json';
import PlayerService from './PlayerService';

import {UNDRAFTED_TEAM_ID} from '../constants';

const positions = ['PG', 'SG', 'SF', 'PF', 'C', 'G', 'F', 'GF', 'FC']

export default class PlayerBuilder{
    
    constructor(randomizer){
        this.randomizer = randomizer || new Randomizer();
        this.playerService = new PlayerService();
    }
    
    calculateAbility(stamina, scoring, defense, rebounding, passing){
        const attrs = [defense, rebounding, passing];
        attrs.sort((a,b) => b - a);
        //return Math.round((stamina*2 + scoring*4 + attrs[0]*2 + attrs[1]*2)/10);
        return Math.round((stamina + scoring + defense + rebounding + passing)/5);
    }
    
    buildDraftPlayer(year, id, upperBound){
        const name = this.randomizer.getRandomItem(firstNames) + ' ' + this.randomizer.getRandomItem(surnames);
        const age = this.randomizer.getRandomInteger(19, 22);
        const dob = year - age - 1;
        
        const attack = 100;
        const defense = 100;   
        const magicAttack = 100;
        const magicDefense = 100;
        const speed = 50;
        
        const player = {
            id,
            teamId: UNDRAFTED_TEAM_ID,
            name,
            dob,
            age,
            contractExpiry: undefined,
            attack,
            defense,
            magicAttack,
            magicDefense,
            speed,
            salary: 2.5,
            draftYear: year
        }
        
        const expectedSalary = this.playerService.calculateExpectedSalary(player);
        return Object.assign({}, player, {expectedSalary});
    }
}


// WEBPACK FOOTER //
// src/services/PlayerBuilder.js