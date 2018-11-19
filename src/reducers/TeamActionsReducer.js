import stateModifier from './modifiers/stateModifier';
import stateSelector from '../utils/stateSelector';
import {toast} from 'react-toastify';
import {chain} from '../utils/utils';

export default class PlayerActionsReducer{
    
    constructor(){

    }
    
    setStarters(action, state){
        const {starters} = action;
        return stateModifier.modifyGameState(state, {starters});        
    }

}