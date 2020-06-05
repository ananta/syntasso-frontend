import { combineReducers, CombinedState } from "redux";

import Auth from "./Auth";
const appReducer = combineReducers({
  Auth,
});

interface actionType {
  type: string;
  what?: string;
  params?: object;
}

const rootReducer = (
  state: CombinedState<any> | undefined,
  action: actionType
) => {
  if (action.type === "HARD_RESET") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
