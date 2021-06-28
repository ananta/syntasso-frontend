import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface ISearchBookmarks {
  token: string;
  page: number;
  limit: number;
  query?: string;
  type: string;
  bookmarkType: string;
}

const SearchBookmarks = ({ token, limit, page, query, type, bookmarkType }: ISearchBookmarks) => {
  return makeRequest({
    method: 'get',
    path:
      EndPoint.Search +
      `?type=${type}&${query && query.length > 1 ? 'query=' + query + '&' : ''}${
        bookmarkType && bookmarkType.length > 1 ? 'bookmarkType=' + bookmarkType + '&' : ''
      }page=${page}&limit=${limit}`,
    token,
    data: {},
  });
};

export default SearchBookmarks;
