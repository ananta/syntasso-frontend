import { Contest } from '../actions/ActionTypes';

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

export interface contestProps {
    [index: string]: commonStateProps | any;
}

const initialState: contestProps = { data };

initialState[Contest.Add] = { ...commonState };
initialState[Contest.Get] = { ...commonState };

const contestReducer = (
    state: contestProps = initialState,
    action: {
        type: string;
        data?: any;
        message?: string | null | undefined;
        what: string;
    },
) => {
    const oldState = <commonStateProps>state[action.what];
    switch (action.type) {
        case Contest.Start:
            oldState.isBusy = true;
            oldState.isSuccess = false;
            oldState.message = null;
            return {
                ...state,
                [action.what]: {
                    ...oldState,
                },
            };
        case Contest.Reset:
            return {
                ...state,
                data,
                [action.what]: {
                    ...commonState,
                },
            };
        case Contest.Success:
            oldState.isBusy = false;
            oldState.isSuccess = true;
            oldState.message = null;
            if (action.what === Contest.Get) {
                state.data = [...action.data];
            }
            return {
                ...state,
                [action.what]: {
                    ...oldState,
                },
            };
        case Contest.Fail:
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

export default contestReducer;
