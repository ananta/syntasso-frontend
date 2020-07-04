import { Challenge } from '../actions/ActionTypes';

const data = [];

interface commonStateProps {
    isBusy: boolean;
    isSuccess: boolean;
    message: string | null | undefined;
    data: object[] | null;
}

const commonState: commonStateProps = {
    isBusy: false,
    isSuccess: false,
    message: null,
    data: null,
};

export interface challengeProps {
    [index: string]: commonStateProps | any;
}

const initialState: challengeProps = { data };

initialState[Challenge.Add] = { ...commonState };
initialState[Challenge.Get] = { ...commonState };

const challengeReducer = (
    state: challengeProps = initialState,
    action: {
        type: string;
        data?: any;
        message?: string | null | undefined;
        what: string;
    },
) => {
    const oldState = <commonStateProps>state[action.what];
    switch (action.type) {
        case Challenge.Start:
            oldState.isBusy = true;
            oldState.isSuccess = false;
            oldState.message = null;
            return {
                ...state,
                [action.what]: {
                    ...oldState,
                },
            };
        case Challenge.Reset:
            return {
                ...state,
                data,
                [action.what]: {
                    ...commonState,
                },
            };
        case Challenge.Success:
            oldState.isBusy = false;
            oldState.isSuccess = true;
            oldState.message = null;
            if (action.what === Challenge.Get) {
                state.data = [...action.data];
            }
            // if (action.what === Auth.Login) {
            //     state.data = {
            //         isLoggedIn: true,
            //         user: action.data.user,
            //     };
            // } else if (action.what === Auth.Logout) {
            //     return {
            //         ...initialState,
            //     };
            // }
            return {
                ...state,
                [action.what]: {
                    ...oldState,
                },
            };
        case Challenge.Fail:
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

export default challengeReducer;
