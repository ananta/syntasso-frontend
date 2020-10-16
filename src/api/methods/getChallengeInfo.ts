import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getChallengeProps {
  token: string;
  challengeId: string;
}

const getChallenge = ({ token, challengeId }: getChallengeProps) => {
  return makeRequest({
    method: 'get',
    path: EndPoint.Challenges + `/${challengeId}`,
    token,
    data: {},
  });
};

export default getChallenge;
