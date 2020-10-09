import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface addContestToChallenge {
    contestId: number;
    token: string;
    challengeId: number;
}

const addChallengeToContest = ({ contestId, token, challengeId }: addContestToChallenge) => {
    return makeRequest({
        method: 'post',
        path: `${EndPoint.Contest}/challenge/add`,
        data: { contestId, challengeId },
        token,
    });
};

export default addChallengeToContest;
