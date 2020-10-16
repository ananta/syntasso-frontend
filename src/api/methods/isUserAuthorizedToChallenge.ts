import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getChallengeProps {
  token: string;
  challengeId: string;
}

const getChallenge = ({ token, challengeId }: getChallengeProps) => {
  console.log(token);
  return makeRequest({
    method: 'get',
    path: EndPoint.Challenges + '/authorized/' + challengeId,
    token,
    data: {},
  });
};

export default getChallenge;
