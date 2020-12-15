import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface searchContestProps {
  token: string;
  page: number;
  limit: number;
  query?: string;
  status?: string;
  type: string;
}

const searchContest = ({ token, limit, page, query, type, status }: searchContestProps) => {
  return makeRequest({
    method: 'get',
    path:
      EndPoint.Search +
      `?type=${type}&${
        query && query.length > 1 ? 'query=' + query + '&' : ''
      }page=${page}&limit=${limit}&status=${status}`,
    token,
    data: {},
  });
};

export default searchContest;
