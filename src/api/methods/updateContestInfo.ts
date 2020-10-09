import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface contestProps {
    name: string;
    description: string;
    difficulty: string;
    startTime: Date;
    endTime: Date;
}

interface updateContestProps {
    token: string;
    contest: contestProps;
    contestId: number;
}

const updateContest = ({ token, contest, contestId }: updateContestProps) => {
    return makeRequest({
        method: 'put',
        path: EndPoint.Contest,
        token,
        data: {
            contestId,
            contest,
        },
    });
};

export default updateContest;
