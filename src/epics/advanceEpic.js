import { Observable } from 'rxjs';
import * as actions from '../actions';
import Randomizer from '../utils/Randomizer';
import { GAME_STATE_REGULAR_SEASON, 
    GAME_STATE_PRE_BATTLE,
    GAME_STATE_BATTLE,
    GAME_STATE_POST_BATTLE,
    GAME_STATE_PLAYOFFS,
    GAME_STATE_END_OF_SEASON, 
    GAME_STATE_POST_SEASON, 
    GAME_STATE_FREE_AGENCY, 
    GAME_STATE_CONTRACT_NEGOTIATIONS,
    GAME_STATE_DRAFT} from '../constants';

const randomizer = new Randomizer();

export const advanceEpic = (action$, store) =>
  action$
    .filter(action => action.type === actions.ADVANCE)
    .debounceTime(0)
    .switchMap(({seed}) => {
        const state = store.getState();
        
        const actions = getActions(state, seed);
        
        return actions;
    });
    
function getActions(state, seed){
    const stage = state.gameState.stage
    
    const simulate = false;
        
    switch (stage){            
        case (GAME_STATE_REGULAR_SEASON): {
            if(simulate){
                if(state.gameState.round === state.fixtures.length) return Observable.of(actions.setStage(GAME_STATE_POST_SEASON));
                return Observable.concat(
                    Observable.of(actions.playNextRound(state.fixtures.length - state.gameState.round)),
                    Observable.of(actions.doDraft(seed)),                    
                    Observable.of(actions.handleExpiringContracts(seed)), 
                    Observable.of(actions.createFreeAgents(seed)),
                    Observable.of(actions.aiSignFreeAgents(seed)),
                    Observable.of(actions.endSeason(seed))
                );
            }
            return Observable.of(actions.setStage(GAME_STATE_PRE_BATTLE));
        }
        case (GAME_STATE_PRE_BATTLE): return Observable.of(actions.setStage(GAME_STATE_BATTLE));
        case (GAME_STATE_BATTLE): return Observable.of(actions.playNextRound(1));
        case (GAME_STATE_POST_BATTLE): return state.gameState.round === state.fixtures.length ? Observable.of(actions.setStage(GAME_STATE_POST_SEASON)) : Observable.of(actions.setStage(GAME_STATE_REGULAR_SEASON));            
        case (GAME_STATE_POST_SEASON): return Observable.of(actions.doDraft(seed));
        case (GAME_STATE_DRAFT): return Observable.of(actions.handleExpiringContracts(seed));
        case (GAME_STATE_CONTRACT_NEGOTIATIONS): return Observable.of(actions.createFreeAgents(seed));            
        case (GAME_STATE_FREE_AGENCY): return Observable.of(actions.aiSignFreeAgents(seed));
        case (GAME_STATE_END_OF_SEASON): return Observable.of(actions.endSeason(seed));            
    }
}