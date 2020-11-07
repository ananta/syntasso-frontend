import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IEnrollProps {
  contestId: number;
  token: string;
}

const getContestEnrollments = ({ contestId, token }: IEnrollProps) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Contest}/enrollments/${contestId}`,
    data: {},
    token,
  });
};

export default getContestEnrollments;
