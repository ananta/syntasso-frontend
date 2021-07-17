import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface challengeInfoProps {
  name: string;
  description: string;
  problemStatement: string;
  difficulty: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  tags?: string[];
}

interface updateChallengeProps {
  token: string;
  challenge: challengeInfoProps;
  challengeId: string;
}

const updateChallenge = ({ token, challengeId, challenge }: updateChallengeProps) => {
  return makeRequest({
    method: 'put',
    path: EndPoint.Challenges,
    token,
    data: {
      challengeId,
      challenge,
    },
  });
};

export default updateChallenge;
