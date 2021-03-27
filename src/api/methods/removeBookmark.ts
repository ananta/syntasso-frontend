import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IRemoveBookmark {
  bookmarkId: string;
  token: string;
}

const removeBookmark = ({ bookmarkId, token }: IRemoveBookmark) => {
  return makeRequest({
    method: 'delete',
    path: `${EndPoint.Bookmark}/${bookmarkId}`,
    data: {},
    token,
  });
};

export default removeBookmark;
