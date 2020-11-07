import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IContestLeaderboard {
  contestId: number;
  token: string;
}

const getContestSubmissions = ({ contestId, token }: IContestLeaderboard) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Submission}/contest/submissions/${contestId}`,
    data: {},
    token,
  });
};

export default getContestSubmissions;
