import { removeBookmark } from 'api';
import createBookmark from 'api/methods/createBookmark';
import getContentBookmark from 'api/methods/getContentBookmark';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useBookmark = ({
  bookmarkType,
  contentId,
  token,
}: {
  bookmarkType: 'challenge' | 'contest';
  contentId: string;
  token: string;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  const [currentBookmarkInfo, setCurrentBookmarkInfo] = useState({
    bookmarkId: '',
  });
  const handleFetchBookmarkStatus = async () => {
    try {
      setIsBookmarkLoading(true);
      const bookmarkRes = await getContentBookmark({
        bookmarkType,
        contentId,
        token,
      });
      if (!bookmarkRes.response.isSuccess) throw new Error(bookmarkRes.response.message);
      setIsBookmarked(bookmarkRes.response.bookmarks.success);
      setCurrentBookmarkInfo({
        ...bookmarkRes.response.bookmarks,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBookmarkLoading(false);
    }
  };
  useEffect(() => {
    handleFetchBookmarkStatus();
  }, []);

  const handleBookmarkContent = async () => {
    try {
      setIsBookmarkLoading(true);
      const bookmarkRes = await createBookmark({
        bookmarkType,
        contentId,
        token,
      });
      if (!bookmarkRes.response.isSuccess) throw new Error(bookmarkRes.response.message);
      setIsBookmarked(bookmarkRes.response.isSuccess);
      setCurrentBookmarkInfo({
        ...bookmarkRes.response.bookmarks,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      if (!currentBookmarkInfo.bookmarkId) throw new Error('Cannot remove unidentified bookmark');
      setIsBookmarkLoading(true);
      const bookmarkRes = await removeBookmark({
        bookmarkId: currentBookmarkInfo.bookmarkId,
        token,
      });
      if (!bookmarkRes.response.isSuccess) throw new Error(bookmarkRes.response.message);
      setIsBookmarked(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  useEffect(() => {
    handleFetchBookmarkStatus();
  }, [isBookmarked]);

  const handleTogglee = () => {
    if (isBookmarked) {
      handleRemoveBookmark();
    } else {
      handleBookmarkContent();
    }
  };
  return {
    isBookmarkLoading,
    isBookmarked,
    recheck: handleFetchBookmarkStatus,
    toggle: handleTogglee,
  };
};

export default useBookmark;
