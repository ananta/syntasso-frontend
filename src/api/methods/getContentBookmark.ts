import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface IContentBookmark {
  bookmarkType: 'contest' | 'challenge';
  contentId: string;
  token: string;
}

const getContentBookmark = ({ bookmarkType, contentId, token }: IContentBookmark) => {
  return makeRequest({
    method: 'get',
    path: `${EndPoint.Bookmark}?bookmarkType=${bookmarkType}&contentId=${contentId}`,
    data: {},
    token,
  });
};

export default getContentBookmark;
