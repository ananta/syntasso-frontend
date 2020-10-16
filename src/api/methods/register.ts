import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface registerProps {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const register = (regInfo: registerProps) => {
  return makeRequest({
    method: 'post',
    path: EndPoint.Register,
    data: { ...regInfo },
  });
};

export default register;
