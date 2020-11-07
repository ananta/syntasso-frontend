import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IChallengeLeaderboard {
  challengeId: number;
  token: string;
}

const getChallengeLeaderboard = ({ challengeId, token }: IChallengeLeaderboard) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Submission}/challenge/leaderboard/${challengeId}`,
    data: {},
    token,
  });
};

export default getChallengeLeaderboard;
