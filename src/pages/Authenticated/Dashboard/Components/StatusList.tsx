import React from 'react';
import StatusListItem from './StatusListItem';
import { GrTrophy, GrSend } from 'react-icons/gr';
import { FaUsers, FaThumbsUp } from 'react-icons/fa';
const StatusList = () => {
  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
      <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
        System Status
      </h2>
      <div className="mt-6 flow-root">
        <ul className="-my-5 divide-y divide-gray-200">
          <StatusListItem Icon={GrTrophy} title="Ongoing Contests" recentActivityTime={new Date().toString()} />
          <StatusListItem Icon={GrSend} title="Total Submissions" recentActivityTime={new Date().toString()} />
          <StatusListItem Icon={FaThumbsUp} title="Solved Challenges" recentActivityTime={new Date().toString()} />
          <StatusListItem Icon={FaUsers} title="Total Users" recentActivityTime={new Date().toString()} />
        </ul>
      </div>
    </div>
  );
};

export default StatusList;
