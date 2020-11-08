import { combineReducers, CombinedState } from 'redux';

import Auth from './Auth';
import Challenge from './Challenges';
import Contest from './Contest';

const appReducer = combineReducers({
  Auth,
  Challenge,
  Contest,
});

interface actionType {
  type: string;
  what?: string;
  params?: object;
}

const rootReducer = (state: CombinedState<any> | undefined, action: actionType) => {
  // if (action.type === 'HARD_RESET') {
  //     storage.removeItem('persist:root');
  //     state = undefined;
  // }
  return appReducer(state, action);
};

export default rootReducer;
