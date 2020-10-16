import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface loginProps {
  username: string;
  password: string;
}

const login = ({ username, password }: loginProps) => {
  return makeRequest({
    method: 'post',
    path: EndPoint.Login,
    data: { username, password },
  });
};

export default login;
