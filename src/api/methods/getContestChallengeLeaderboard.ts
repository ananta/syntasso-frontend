import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IChallengeLeaderboard {
  challengeId: number;
  contestId: number;
  token: string;
}

const getContestChallengeLeaderboard = ({ challengeId, contestId, token }: IChallengeLeaderboard) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Submission}/contest/challenge/leaderboard/${contestId}/${challengeId}`,
    data: {},
    token,
  });
};

export default getContestChallengeLeaderboard;
