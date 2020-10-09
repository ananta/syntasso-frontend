import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getContestChallengesProps {
    contestId: number;
    token: string;
}

const getContestChallenges = ({ contestId, token }: getContestChallengesProps) => {
    return makeRequest({
        method: 'get',
        path: `${EndPoint.Contest}/challenge/${contestId}`,
        data: {},
        token,
    });
};

export default getContestChallenges;
