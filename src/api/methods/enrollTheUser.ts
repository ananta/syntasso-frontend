import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IEnrollProps {
  contestId: number;
  token: string;
}

const enrollUserIntoContest = ({ contestId, token }: IEnrollProps) => {
  return makeRequest({
    method: 'post',
    path: `${EndPoint.Contest}/user/enroll`,
    data: { contestId },
    token,
  });
};

export default enrollUserIntoContest;
