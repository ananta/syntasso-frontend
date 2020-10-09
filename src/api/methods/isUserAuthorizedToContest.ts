import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getContestProps {
    token: string;
    contestId: string;
}

const getContest = ({ token, contestId }: getContestProps) => {
    console.log(token);
    return makeRequest({
        method: 'get',
        path: EndPoint.Contest + '/authorized/' + contestId,
        token,
        data: {},
    });
};

export default getContest;
