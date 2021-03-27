import makeRequest from 'api/makeRequest';
import EndPoint from 'api/EndPoint';

interface newBookmark {
  bookmarkType: 'contest' | 'challenge';
  contentId: string;
  token: string;
}

const createBookmark = ({ bookmarkType, contentId, token }: newBookmark) => {
  const data = {};
  data['bookmarkType'] = bookmarkType;
  if (bookmarkType === 'contest') data['contestId'] = contentId.toString();
  if (bookmarkType === 'challenge') data['challengeId'] = contentId.toString();
  return makeRequest({
    method: 'post',
    path: EndPoint.Bookmark,
    data,
    token,
  });
};

export default createBookmark;
