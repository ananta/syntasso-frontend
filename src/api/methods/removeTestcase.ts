import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface removeTestcaseProps {
  token: string;
  testcaseId: string;
}

const removeTestcase = ({ token, testcaseId }: removeTestcaseProps) => {
  return makeRequest({
    method: 'delete',
    path: EndPoint.Testcase + '/' + testcaseId,
    token,
    data: {},
  });
};

export default removeTestcase;
