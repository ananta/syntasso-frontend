import React from 'react';

const CustomLoader = () => {
  return (
    <div className=" w-full mx-auto px-4 py-4">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-1">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
