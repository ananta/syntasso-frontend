import { BASE_URL } from './EndPoint';
import axios, { AxiosRequestConfig, Method } from 'axios';

interface RequestObject {
    method: Method;
    path: string;
    data: Object;
    token?: string | string;
    rest?: Object;
}

interface RequestResponse {
    isSuccess: boolean;
    response: {
        message: string;
        data?: any;
        challenge?: any;
        contest?: any;
        contests?: any;
        challenges?: any;
        isSuccess: boolean;
        testcases?: any;
    };
    message: string | null | undefined;
}

const makeRequest = async ({ method, path, data, token, ...rest }: RequestObject): Promise<RequestResponse> => {
    const request = axios;
    const options: AxiosRequestConfig = {
        url: BASE_URL + path,
        method,
        data,
        headers: {},
        ...rest,
    };
    if (token && token.trim().length > 1) {
        options.headers = {
            // $FlowFixMe
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        };
    } else {
        throw new Error('Please Login to proceed');
    }
    try {
        console.log(options);
        const response = await request(options);
        console.log(response.data);
        return {
            isSuccess: true,
            response: response.data,
            message: null,
        };
    } catch (err) {
        return {
            isSuccess: false,
            response: err.response,
            message: (err.response.data && err.response.data.message && err.response.data.message) || err.message,
        };
    }
};

export default makeRequest;
