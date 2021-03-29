import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IContestChallengeSubmissions {
  challengeId: number;
  contestId: number;
  token: string;
}

const getContestChallengeSubmissions = ({ challengeId, contestId, token }: IContestChallengeSubmissions) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Submission}/contest/submissions/${contestId}/${challengeId}`,
    data: {},
    token,
  });
};

export default getContestChallengeSubmissions;
