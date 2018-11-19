import { Observable } from 'rxjs';
import * as actions from '../actions';

import GameDataBuilder from '../services/GameDataBuilder';

const gameDataBuilder = new GameDataBuilder();

export const loadTestDataEpic = (action$) =>
  action$
    .filter(action => action.type === actions.LOAD_TEST_DATA)
    .debounceTime(0)
    .switchMap(() => {
        return Observable.of(actions.loadGameData(gameDataBuilder.build()));
    });