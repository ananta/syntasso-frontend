import { Auth } from './ActionTypes';

import { toast } from 'react-toastify';
import { login } from 'api';

interface authParams {
  input?: {
    username: string;
    password: string;
  };
}

const authAction = (action: string, params: authParams) => async (dispatch: Function) => {
  dispatch({ type: Auth.Start, what: action });
  switch (action) {
    case Auth.Login:
      try {
        const res = await login(params.input);
        if (!res.isSuccess) {
          throw new Error((res.message && res.message) || 'Server under maintainance!');
        }
        toast.success(`Welcome ${res.response.data.username}`);
        dispatch({
          type: Auth.Success,
          what: Auth.Login,
          data: { user: { ...res.response.data } },
        });
        break;
      } catch (err) {
        toast.error(err.message);
        dispatch({
          type: Auth.Failed,
          what: Auth.Login,
          data: {},
        });
      }
      break;
    case Auth.Logout:
      dispatch({ type: Auth.Reset });
      break;
    default:
  }
};

export default authAction;
