import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IContestLeaderboard {
  contestId: number;
  token: string;
}

const getContestLeaderboard = ({ contestId, token }: IContestLeaderboard) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Submission}/contest/leaderboard/${contestId}`,
    data: {},
    token,
  });
};

export default getContestLeaderboard;
