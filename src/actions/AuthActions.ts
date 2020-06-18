import { Auth } from './ActionTypes';
import { persistor } from 'store';
import { toast } from 'react-toastify';

interface authParams {
    input?: {
        email: string;
        password: string;
    };
    token?: string;
}

const authAction = (action: string, params: authParams) => async (dispatch: Function) => {
    dispatch({ type: Auth.Start, what: action });
    switch (action) {
        case Auth.Login:
            try {
                const { email, password } = params.input!;
                await new Promise((resolve) => setTimeout(resolve, 5000));
                toast.success('Logged In!');
                dispatch({
                    type: Auth.Success,
                    what: Auth.Login,
                    data: { user: { token: 'testToken', email, password } },
                });

                break;
            } catch (err) {
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
