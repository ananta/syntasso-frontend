import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface codeInfo {
  content: string;
  language: string;
}

interface newSubmission {
  challengeId: number;
  socketId: string | boolean;
  code: codeInfo;
  token: string;
  isContest?: boolean;
  contestId?: number;
}

const createSubmission = ({ token, ...submission }: newSubmission) => {
  return makeRequest({
    method: 'post',
    path: EndPoint.Submission,
    data: { ...submission },
    token,
  });
};

export default createSubmission;
