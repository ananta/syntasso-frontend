import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IGetUserInfo {
  username: string;
  token: string;
}

const getUserInfo = ({ username, token }: IGetUserInfo) => {
  return makeRequest({
    method: 'post',
    path: `${EndPoint.UserProfile}`,
    data: { username },
    token,
  });
};

export default getUserInfo;
