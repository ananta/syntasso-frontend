import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IDoesChallengeAndContestExists {
  contestId: number;
  challengeId: number;
  token: string;
}

const doesChallengeAndContestExists = ({ contestId, challengeId, token }: IDoesChallengeAndContestExists) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Contest}/${contestId}/challenge/${challengeId}`,
    data: {},
    token,
  });
};

export default doesChallengeAndContestExists;
