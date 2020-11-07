import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IChallengeSubmissions {
  challengeId: number;
  token: string;
}

const getChallengeSubmissions = ({ challengeId, token }: IChallengeSubmissions) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Submission}/challenge/${challengeId}`,
    data: {},
    token,
  });
};

export default getChallengeSubmissions;
