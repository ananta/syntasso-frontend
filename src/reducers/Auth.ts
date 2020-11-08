import { Auth } from '../actions/ActionTypes';

interface authData {
  user: {
    token: string;
    username: string;
    password: string;
  };
  isLoggedIn: boolean;
}

const data: authData = {
  user: {
    token: '',
    username: '',
    password: '',
  },
  isLoggedIn: false,
};

interface commonStateProps {
  isBusy: boolean;
  isSuccess: boolean;
  message: string | null | undefined;
  data: object | null;
}

const commonState: commonStateProps = {
  isBusy: false,
  isSuccess: false,
  message: null,
  data: null,
};

export interface authProps {
  [index: string]: commonStateProps | authData;
}

const initialState: authProps = { data };

initialState[Auth.Login] = { ...commonState };
initialState[Auth.Logout] = { ...commonState };

const authReducer = (
  state: authProps = initialState,
  action: {
    type: string;
    data?: any;
    message?: string | null | undefined;
    what: string;
  },
) => {
  const oldState = <commonStateProps>state[action.what];
  switch (action.type) {
    case Auth.Start:
      oldState.isBusy = true;
      oldState.isSuccess = false;
      oldState.message = null;
      return {
        ...state,
        [action.what]: {
          ...oldState,
        },
      };
    case Auth.Reset:
      return {
        ...state,
        data,
        [action.what]: {
          ...commonState,
        },
      };
    case Auth.Success:
      oldState.isBusy = false;
      oldState.isSuccess = true;
      oldState.message = null;
      if (action.what === Auth.Login) {
        state.data = {
          isLoggedIn: true,
          user: action.data.user,
        };
      } else if (action.what === Auth.Logout) {
        return {
          ...initialState,
        };
      }
      return {
        ...state,
        [action.what]: {
          ...oldState,
        },
      };
    case Auth.Failed:
      oldState.isBusy = false;
      oldState.message = action.message;
      oldState.isSuccess = false;
      return {
        ...state,
        [action.what]: {
          ...oldState,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
