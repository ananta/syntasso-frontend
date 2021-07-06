import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

const getSystemStatus = () => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.System}/status`,
    data: {},
  });
};

export default getSystemStatus;
