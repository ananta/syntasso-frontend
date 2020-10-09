import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface removeContestProps {
    token: string;
    contestId: number;
}

const removeContest = ({ token, contestId }: removeContestProps) => {
    return makeRequest({
        method: 'delete',
        path: EndPoint.Contest + '/' + contestId,
        token,
        data: {},
    });
};

export default removeContest;
