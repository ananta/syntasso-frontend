import { Challenge } from './ActionTypes';
import { history } from 'utils/History';

import { toast } from 'react-toastify';
import { createChallenge, getChallenge } from 'api';

const challengeAction = (action: string, params: any) => async (dispatch: Function, getState: Function) => {
  dispatch({ type: Challenge.Start, what: action });
  switch (action) {
    case Challenge.Add:
      try {
        const state = getState();
        const token = state['Auth'].data.user.token;
        const res = await createChallenge({
          challenge: params.input,
          token,
        });
        if (!res.isSuccess) {
          throw new Error((res.message && res.message) || 'Server under maintainance!');
        }
        history.replace(
          history.location.pathname.replace('/create', `/edit/${res.response.challenge.challengeId}/details`),
        );
        toast.success(`Created your challenge!`);
        dispatch({
          type: Challenge.Success,
          what: Challenge.Add,
          data: {},
        });
        dispatch(challengeAction(Challenge.Get, {}));
        break;
      } catch (err) {
        toast.error(err.message);
        dispatch({
          type: Challenge.Fail,
          what: Challenge.Add,
          data: {},
        });
      }
      break;
    case Challenge.Get:
      try {
        const state = getState();
        const token = state['Auth'].data.user.token;
        const res = await getChallenge({
          token,
        });
        if (!res.isSuccess) {
          throw new Error((res.message && res.message) || 'Server under maintainance!');
        }
        dispatch({
          type: Challenge.Success,
          what: Challenge.Get,
          data: res.response.challenges,
        });
        break;
      } catch (err) {
        toast.error(err.message);
        dispatch({
          type: Challenge.Fail,
          what: Challenge.Add,
          data: {},
        });
      }
      break;
    default:
  }
};

export default challengeAction;
