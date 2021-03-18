import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getUserEnrollmentsProps {
  token: string;
  username: string;
  page: number;
  limit: number;
}

const getUserEnrollment = ({ token, username, page, limit }: getUserEnrollmentsProps) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Contest}/user/enrolled?page=${page}&limit=${limit}&username=${username}`,
    token,
    data: {},
  });
};

export default getUserEnrollment;
