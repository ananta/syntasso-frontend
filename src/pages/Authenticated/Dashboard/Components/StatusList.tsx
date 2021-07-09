import React, { useState, useEffect } from 'react';
import StatusListItem, { StatusListItemSkeleton } from './StatusListItem';
import { GrTrophy, GrSend } from 'react-icons/gr';
import { FaUsers, FaThumbsUp } from 'react-icons/fa';
import { getSystemStatus } from 'api';
import { toast } from 'react-toastify';

const initialStatusItems = {
  onGoingContests: {
    amount: 0,
    time: '0',
  },
  totalSubmissions: {
    amount: 0,
    time: '0',
  },
  solvedChallenges: {
    amount: 0,
    time: '0',
  },
  totalUsers: {
    amount: 0,
    time: '0',
  },
};
const StatusList = () => {
  const [isSystemStatusLoading, setSystemStatusLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState(initialStatusItems);

  const handleGetSystemStatus = async () => {
    try {
      const statusRes = await getSystemStatus();
      setSystemStatus({ ...statusRes.response.data });
      console.log({ statusRes });
    } catch (err) {
      setSystemStatus(initialStatusItems);
      toast.error(err.message || 'Failed getting system status');
    }
    setSystemStatusLoading(false);
  };

  useEffect(() => {
    handleGetSystemStatus();
  }, []);

  return (
    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
      <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
        System Status
      </h2>
      <div className="mt-6 flow-root">
        <ul className="-my-5 divide-y divide-gray-200">
          {isSystemStatusLoading ? (
            <>
              <StatusListItemSkeleton />
              <StatusListItemSkeleton />
              <StatusListItemSkeleton />
              <StatusListItemSkeleton />
            </>
          ) : (
            <>
              <StatusListItem
                Icon={GrTrophy}
                title="Ongoing Contests"
                value={systemStatus.onGoingContests.amount || 0}
                recentActivityTime={systemStatus.onGoingContests.time || new Date().toString()}
              />
              <StatusListItem
                Icon={GrSend}
                title="Total Submissions"
                value={systemStatus.totalSubmissions.amount || 0}
                recentActivityTime={systemStatus.totalSubmissions.time || new Date().toString()}
              />
              <StatusListItem
                Icon={FaThumbsUp}
                title="Solved Challenges"
                value={systemStatus.solvedChallenges.amount || 0}
                recentActivityTime={systemStatus.solvedChallenges.time || new Date().toString()}
              />
              <StatusListItem
                Icon={FaUsers}
                title="Total Users"
                value={systemStatus.totalUsers.amount || 0}
                recentActivityTime={systemStatus.totalUsers.time || new Date().toString()}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StatusList;
