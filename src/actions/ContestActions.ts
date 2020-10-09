import { Contest } from './ActionTypes';
import { history } from 'utils/History';

import { toast } from 'react-toastify';
import { createContest, getContest } from 'api';

const challengeAction = (action: string, params: any) => async (dispatch: Function, getState: Function) => {
    dispatch({ type: Contest.Start, what: action });
    switch (action) {
        case Contest.Add:
            try {
                const state = getState();
                const token = state['Auth'].data.user.token;
                const res = await createContest({
                    contest: params.input,
                    token,
                });
                if (!res.isSuccess) {
                    throw new Error((res.message && res.message) || 'Server under maintainance!');
                }
                console.log({ contest: res.response.contest });
                history.replace(
                    history.location.pathname.replace('/create', `/edit/${res.response.contest.contestId}/details`),
                );
                toast.success(`Contest Created`);
                dispatch({
                    type: Contest.Success,
                    what: Contest.Add,
                    data: {},
                });
                dispatch(challengeAction(Contest.Get, {}));
                break;
            } catch (err) {
                toast.error(err.message);
                dispatch({
                    type: Contest.Fail,
                    what: Contest.Add,
                    data: {},
                });
            }
            break;
        case Contest.Get:
            try {
                const state = getState();
                const token = state['Auth'].data.user.token;
                const res = await getContest({
                    token,
                });
                if (!res.isSuccess) {
                    throw new Error((res.message && res.message) || 'Server under maintainance!');
                }
                dispatch({
                    type: Contest.Success,
                    what: Contest.Get,
                    data: res.response.contests,
                });
                break;
            } catch (err) {
                toast.error(err.message);
                dispatch({
                    type: Contest.Fail,
                    what: Contest.Add,
                    data: {},
                });
            }
            break;
        default:
    }
};

export default challengeAction;
