import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getContestProps {
  token: string;
}

const getContest = ({ token }: getContestProps) => {
  console.log(token);
  return makeRequest({
    method: 'get',
    path: EndPoint.Contest,
    token,
    data: {},
  });
};

export default getContest;
