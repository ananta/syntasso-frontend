import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getAvailableTags {
  token: string;
}

const getAvailableTags = ({ token }: getAvailableTags) => {
  console.log(token);
  return makeRequest({
    method: 'get',
    path: EndPoint.Tags,
    token,
    data: {},
  });
};

export default getAvailableTags;
