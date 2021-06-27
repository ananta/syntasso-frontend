import React from 'react';
import DvrIcon from '@material-ui/icons/Dvr';

const NoPostYet = () => {
  return (
    <div className=" w-full mx-auto">
      <div
        className="mt-12 mb-12"
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <DvrIcon style={{ color: 'rgba(107, 114, 128, 1)', fontSize: 40 }} />
        <div className={'text-xl  align-middle text-gray-600 capitalize'}>no posts yet</div>
      </div>
    </div>
  );
};

export default NoPostYet;
