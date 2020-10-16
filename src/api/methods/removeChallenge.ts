import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface removeChallengeProps {
  token: string;
  challengeId: string;
}

const removeChallenge = ({ token, challengeId }: removeChallengeProps) => {
  return makeRequest({
    method: 'delete',
    path: EndPoint.Challenges + '/' + challengeId,
    token,
    data: {},
  });
};

export default removeChallenge;
