import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import CustomCountdownTimer from 'components/Common/CustomCountdownTimer';

interface ISidebar {
  endTime?: string;
}

const Sidebar: React.FC<ISidebar> = ({ endTime }) => {
  const { url } = useRouteMatch();
  return (
    <div className="w-full lg:w-1/4 px-3">
      <div className="p-1 mb-4 relative">
        <h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Ends In</h5>
        {endTime && (
          <div>
            <CustomCountdownTimer endTime={endTime} />
          </div>
        )}
      </div>
      <div className="p-1 mb-4 relative">
        <h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Navigation</h5>
        <ul>
          <li className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
            <Link to={`${url}`}>
              <div className="flex items-center text-gray-600 cursor-pointer">
                <span className="inline-block h-4 w-4 bg-indigo-300 mr-3"></span>
                Challenges
                <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
              </div>
            </Link>
          </li>
          <li className="cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
            <Link to={`${url}/leaderboard`}>
              <div className="flex items-center text-gray-600 cursor-pointer">
                <span className="inline-block h-4 w-4 bg-green-300 mr-3"></span>
                Leaderboard
                <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
              </div>
            </Link>
          </li>
          <li className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
            <Link to={`${url}/submissions`}>
              <div className="flex items-center text-gray-600 cursor-pointer">
                <span className="inline-block h-4 w-4 bg-indigo-300 mr-3"></span>
                Submissions
                <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
              </div>
            </Link>
          </li>
          <li className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
            <Link to={`${url}/enrollments`}>
              <div className="flex items-center text-gray-600 cursor-pointer">
                <span className="inline-block h-4 w-4 bg-red-300 mr-3"></span>
                Enrollments
                <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <div className="p-1 mt-4 mb-4">
        <h5 className="font-bold text-lg uppercase text-gray-700 mb-2"> Admin Options </h5>
        <ul>
          <li
            // onClick={() => setDifficulty('easy')}
            className="cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
          >
            <div className="flex items-center text-gray-600 cursor-pointer">
              <span className="inline-block h-4 w-4 bg-green-300 mr-3"></span>
              Manage Contest
              <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
            </div>
          </li>
        </ul>
      </div>
      <div className="border border-dotted"></div> */}
    </div>
  );
};

export default Sidebar;
