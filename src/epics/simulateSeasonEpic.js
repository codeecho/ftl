import { Observable } from 'rxjs';
import * as actions from '../actions';
import Randomizer from '../utils/Randomizer';
import { GAME_STATE_REGULAR_SEASON } from '../constants';

const randomizer = new Randomizer();

export const simulateSeasonEpic = (action$, store) =>
  action$
    .filter(action => action.type === actions.SIMULATE_SEASON)
    .debounceTime(0)
    .switchMap(({seed}) => {
        const state = store.getState();
        return Observable.of(actions.playNextRound(state.fixtures.length - state.gameState.round));
    });