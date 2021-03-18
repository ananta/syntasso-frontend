import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getUserSubmissionsProps {
  token: string;
  username: string;
  page: number;
  limit: number;
}

const getUserSubmissions = ({ token, username, page, limit }: getUserSubmissionsProps) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Submission}?page=${page}&limit=${limit}&username=${username}`,
    token,
    data: {},
  });
};

export default getUserSubmissions;
