import { combineReducers, CombinedState } from 'redux';
import storage from 'redux-persist/lib/storage';

import Auth from './Auth';
const appReducer = combineReducers({
    Auth,
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
