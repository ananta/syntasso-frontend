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
    <div className="flex flex-wrap justify-center align-middle">
      {loading ? (
        <div className="cursor-pointer text-blue-200 ">
          <StarIcon fontSize="default" />
        </div>
      ) : (
        <div className="cursor-pointer text-blue-600 flex justify-center align-middle" onClick={toggle}>
          {bookmarked ? <StarIcon fontSize="default" /> : <StarBorderIcon fontSize="default" />}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
