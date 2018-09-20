import stateModifier from './modifiers/stateModifier';
import stateSelector from '../utils/stateSelector';
import {toast} from 'react-toastify';
import {chain} from '../utils/utils';

export default class PlayerActionsReducer{
    
    constructor(){

    }
    
    addStarter(action, state){
        const {playerId} = action;
        if(state.gameState.starters.length === 5 || state.gameState.starters.includes(playerId)) return state;
        const starters = state.gameState.starters.concat(playerId);
        return stateModifier.modifyGameState(state, {starters});
    }
    
    removeStarter(action, state){
        const {playerId} = action;
        const starters = state.gameState.starters.filter(id => id !== playerId);
        return stateModifier.modifyGameState(state, {starters});
    }

}


// WEBPACK FOOTER //
// src/reducers/PlayerActionsReducer.js