import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getChallengeProps {
  token: string;
}

const getChallenge = ({ token }: getChallengeProps) => {
  console.log(token);
  return makeRequest({
    method: 'get',
    path: EndPoint.Challenges,
    token,
    data: {},
  });
};

export default getChallenge;
