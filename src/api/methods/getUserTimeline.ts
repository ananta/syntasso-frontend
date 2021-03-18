import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface getUserTimelineProps {
  token: string;
  username: string;
}

const getUserTimeline = ({ token, username }: getUserTimelineProps) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.UserTimeline}/${username}`,
    token,
    data: {},
  });
};

export default getUserTimeline;
