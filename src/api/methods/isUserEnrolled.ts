import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IIsUserEnrolledInContest {
  token: string;
  contestId: string;
}

const isUserEnrolled = ({ token, contestId }: IIsUserEnrolledInContest) => {
  return makeRequest({
    method: 'get',
    path: EndPoint.Contest + '/status/' + contestId,
    token,
    data: {},
  });
};

export default isUserEnrolled;
