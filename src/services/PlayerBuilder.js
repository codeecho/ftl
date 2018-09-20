import Randomizer from '../utils/Randomizer';
import firstNames from '../data/first-names.json';
import surnames from '../data/surnames.json';
import PlayerService from './PlayerService';

import {UNDRAFTED_TEAM_ID} from '../constants';

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
        
        const attack = this.randomizer.getRandomInteger(30, 80);
        const defense = this.randomizer.getRandomInteger(30, 80);   
        const magicAttack = this.randomizer.getRandomInteger(30, 80);
        const magicDefense = this.randomizer.getRandomInteger(30, 80);
        const speed = this.randomizer.getRandomInteger(20, 60);
        const ability = Math.round((attack + defense + magicAttack + magicDefense + speed) / 5);
        const potential = this.randomizer.getRandomInteger(ability, 90);
        
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
            draftYear: year,
            ability,
            potential
        }
        
        const expectedSalary = this.playerService.calculateExpectedSalary(player);
        return Object.assign({}, player, {expectedSalary});
    }
}


// WEBPACK FOOTER //
// src/services/PlayerBuilder.js