import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface searchChallengeProps {
    token: string;
    page: number;
    limit: number;
    difficulty?: string;
    query?: string;
}

const searchChallenge = ({ token, limit, page, difficulty, query }: searchChallengeProps) => {
    return makeRequest({
        method: 'get',
        path:
            EndPoint.Search +
            `?${query && query.length > 1 ? 'query=' + query + '&' : ''}${
                difficulty && difficulty.length > 1 ? 'difficulty=' + difficulty + '&' : ''
            }page=${page}&limit=${limit}`,
        token,
        data: {},
    });
};

export default searchChallenge;
