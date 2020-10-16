import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface newChallenge {
  name: string;
  description: string;
  problemStatement: string;
  difficulty: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
}

interface createChallengeProps {
  challenge: newChallenge;
  token: string;
}

const createChallenge = ({ challenge, token }: createChallengeProps) => {
  return makeRequest({
    method: 'post',
    path: EndPoint.Challenges,
    data: { ...challenge },
    token,
  });
};

export default createChallenge;
