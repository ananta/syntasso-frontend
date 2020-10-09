import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface newContest {
    name: string;
    description: string;
    problemStatement: string;
    difficulty: string;
    constraints: string;
    sampleInput: string;
    sampleOutput: string;
}

interface createContestProps {
    contest: newContest;
    token: string;
}

const createChallenge = ({ contest, token }: createContestProps) => {
    return makeRequest({
        method: 'post',
        path: EndPoint.Contest,
        data: { ...contest },
        token,
    });
};

export default createChallenge;
