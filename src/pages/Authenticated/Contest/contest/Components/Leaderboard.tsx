import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getContestLeaderboard } from 'api';

import LogoWhite from 'shared/assets/images/logo-white.png';

import { IRoutePropsForContest } from './types';
import ContestContainer from './ContestContainer';
import moment from 'moment';
import { history } from 'utils/History';
import TimeAgoGenerator from 'utils/TimeAgoGenerator';
import { ListItemLoader } from 'components/Common/ListItemLoader';
import NoPostYet from 'components/Common/NoPostYet';

interface ILeaderboardState {
  isLoading: boolean;
  leaderboard: any;
}

interface ILeaderboardItem {
  username: string;
  points: string;
  email: string;
  joined: string;
}

const ListItem: React.FC<ILeaderboardItem> = ({ username, email, points, joined }) => (
  <tr
    className="table-row cursor-pointer transition duration-500 ease-in-out  hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-20"
    onClick={() => window.open(`/profile/${username}`, '_blank')}
  >
    {/* <Link to={`/profile/${username}`} className="table-row"> */}
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            alt=""
          />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{username}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {points}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{TimeAgoGenerator({ time: joined })}</td>
    {/* </Link> */}
  </tr>
);

const Leaderboard: React.FC<IRoutePropsForContest> = ({ contestId }) => {
  const [submissionState, setSubmissionState] = useState<ILeaderboardState>({
    isLoading: false,
    leaderboard: [],
  });
  const [error, setError] = useState('');
  const AuthState = useSelector((state) => state['Auth'].data);
  const token = AuthState.user.token.toString();
  const getLeaderboard = async () => {
    const leaderboardRes = await getContestLeaderboard({
      contestId: Number(contestId),
      token,
    });
    console.log('Here is the response');
    if (!leaderboardRes.isSuccess) throw new Error(leaderboardRes.message || 'Cannot get leaderboard');
    return leaderboardRes.response.submissions;
  };
  const handleInitialization = async () => {
    try {
      setSubmissionState((state) => ({
        ...state,
        isLoading: true,
      }));
      const leaderboard = await getLeaderboard();
      setSubmissionState((state) => ({
        ...state,
        isLoading: false,
        leaderboard,
      }));
    } catch (err) {
      toast.error(err.message);
      setError(err.messag);
      setSubmissionState((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    handleInitialization();
  }, []);
  return (
    <ContestContainer
      error={error}
      loading={submissionState.isLoading}
      title="Leaderboard"
      subTitle="Contest Leaderboard at the moment"
    >
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Points
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {!submissionState.isLoading &&
                    submissionState.leaderboard.length > 0 &&
                    submissionState.leaderboard.map((item, index) => (
                      <ListItem
                        key={index}
                        username={item['user_username']}
                        points={item['totalPoints']}
                        email={item['user_email']}
                        joined={item['enrolled_createdAt']}
                      />
                    ))}
                </tbody>
              </table>

              {submissionState.isLoading && <ListItemLoader />}
              {!submissionState.isLoading && !(submissionState.leaderboard.length > 0) && (
                <div className="flex w-full">
                  <NoPostYet />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContestContainer>
  );
};

export default Leaderboard;
