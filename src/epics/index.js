import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

const debugEpic = (action$, store) =>
  action$
    .do(action => console.log('ACTION:', action))
    .switchMap(() => Observable.empty());

const rootEpic = combineEpics(
  debugEpic
);

export default rootEpic;