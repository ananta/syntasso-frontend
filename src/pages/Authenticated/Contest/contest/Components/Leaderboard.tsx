import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getContestLeaderboard } from 'api';

import LogoWhite from 'shared/assets/images/logo-white.png';

import { IRoutePropsForContest } from './types';

interface ILeaderboardState {
  isLoading: boolean;
  leaderboard: any;
}

interface ILeaderboardItem {
  username: string;
  points: string;
}

const LeaderboardItem: React.FC<ILeaderboardItem> = ({ username, points }) => (
  <tr>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-10 h-10">
          <img className="w-full h-full rounded-full" src={LogoWhite} alt="" />
        </div>
        <div className="ml-3">
          <Link to={`/edit/details`}>
            <p className="text-gray-900 whitespace-no-wrap">{username}</p>
          </Link>
        </div>
      </div>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <p className="text-gray-900 whitespace-no-wrap"> {`${points} `}Points</p>
    </td>
  </tr>
);

const Leaderboard: React.FC<IRoutePropsForContest> = ({ contestId }) => {
  const [submissionState, setSubmissionState] = useState<ILeaderboardState>({
    isLoading: false,
    leaderboard: [],
  });
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
    <div>
      <div className="bg-white ">
        <div className="mx-auto">
          <div className="inputs w-full max-w-6xl p-6">
            <h2 className="text-3xl text-gray-900">Leaderboard</h2>
            <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">Leader of the contest at the moment</p>
            <form className="border-t border-gray-400 pt-8">
              <div className=" -mx-3 mb-6">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionState.isLoading ? (
                      <p>Loading info</p>
                    ) : submissionState.leaderboard.length > 0 ? (
                      submissionState.leaderboard.map((item, index) => (
                        <LeaderboardItem key={index} username={item['user_username']} points={item['totalPoints']} />
                      ))
                    ) : (
                      <p>Empty at the moment :) </p>
                    )}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
