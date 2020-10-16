import React from 'react';
import Loader from 'react-loader-spinner';

const CustomLoader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Loader type="TailSpin" color="#FFF" height={25} width={25} />
    </div>
  );
};

export default CustomLoader;
