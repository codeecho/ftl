import Randomizer from '../utils/Randomizer';

import {UNDRAFTED_TEAM_ID} from '../constants';

export default class PlayerService{
    
    applyProjectedTraining(player, years){
        return player;
    }
    
    applyTraining(player){
        return player;
    }
    
    calculateExpectedSalary(player){
        return 8;
    }
    
}