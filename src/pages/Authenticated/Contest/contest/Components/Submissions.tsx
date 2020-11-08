import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import LogoWhite from 'shared/assets/images/logo-white.png';
import { IRoutePropsForContest } from './types';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { getContestSubmission } from 'api';
import truncate from 'utils/Truncate';

interface ISubmissionState {
  isLoading: boolean;
  submissions: [];
}

interface ISubmissionItem {
  username: string;
  points: string;
  challengeName: string;
  challengeId: string;
  submittedAt: string;
}

const SubmissionItem: React.FC<ISubmissionItem> = ({ username, points, challengeName, challengeId, submittedAt }) => {
  const { url } = useRouteMatch();
  const currUrl = url.replace('/submissions', '');
  return (
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
        <Link to={`${currUrl}/challenge/${challengeId}`}>
          <p className="text-gray-900 whitespace-no-wrap">{truncate(challengeName, 15)}</p>
        </Link>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap"> {submittedAt}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap"> {`${points} `}Points</p>
      </td>
    </tr>
  );
};

const Submissions: React.FC<IRoutePropsForContest> = ({ contestId }) => {
  const [submissionState, setSubmissionState] = useState<ISubmissionState>({
    isLoading: false,
    submissions: [],
  });
  const AuthState = useSelector((state) => state['Auth'].data);
  const token = AuthState.user.token.toString();
  const getSubmissions = async () => {
    const leaderboardRes = await getContestSubmission({
      contestId: Number(contestId),
      token,
    });
    if (!leaderboardRes.isSuccess) throw new Error(leaderboardRes.message || 'Cannot get leaderboard');
    return leaderboardRes.response.submissions;
  };
  const handleInitialization = async () => {
    try {
      setSubmissionState((state) => ({
        ...state,
        isLoading: true,
      }));
      const submissions = await getSubmissions();
      setSubmissionState((state) => ({
        ...state,
        isLoading: false,
        submissions,
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
            <h2 className="text-3xl text-gray-900">Submissions</h2>
            <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">
              All submissions made within the contest
            </p>
            <form className="border-t border-gray-400 pt-8">
              <div className=" -mx-3 mb-6">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Challenge
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Submitted At
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionState.isLoading ? (
                      <p>Loading info</p>
                    ) : submissionState.submissions.length > 0 ? (
                      submissionState.submissions.map((item, index) => (
                        <SubmissionItem
                          key={index}
                          username={item['user_username']}
                          points={item['submission_score']}
                          challengeName={item['challenge_name']}
                          submittedAt={item['submission_createdAt']}
                          challengeId={item['challenge_challengeId']}
                        />
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

export default Submissions;
