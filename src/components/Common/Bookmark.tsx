import React from 'react';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

interface IBookmark {
  loading: boolean;
  bookmarked: boolean;
  toggle: () => void;
}

const Bookmark: React.FC<IBookmark> = ({ loading, bookmarked, toggle }) => {
  return (
    <>
      {loading ? (
        <div className="cursor-pointer text-blue-200">
          <StarIcon />
        </div>
      ) : (
        <div className="cursor-pointer text-blue-600" onClick={toggle}>
          {bookmarked ? <StarIcon /> : <StarBorderIcon />}
        </div>
      )}
    </>
  );
};

export default Bookmark;
