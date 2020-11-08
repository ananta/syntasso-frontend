import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import LogoWhite from 'shared/assets/images/logo-white.png';
import CustomLoader from 'components/Common/CustomLoader';
import { getChallengeLeaderboard, getContestChallengeLeaderboard } from 'api';

interface ILeaderboardState {
  isLoading: boolean;
  submissions: any;
}

interface ILeaderboard {
  challenge: {
    challengeId: string;
    name: string;
    description: string;
    authorId: string;
    problemStatement: string;
    difficulty: string;
    constraints: string;
    sampleInput: string;
    sampleOutput: string;
    createdAt: string;
  };
  isContestBased?: boolean;
  contestId?: number;
}

const SubmissionRow = ({
  username,
  status,
  updatedAt,
  score,
}: {
  username: string;
  status: 'completed' | 'partial' | 'failed';
  updatedAt: string;
  score: number;
}) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img className="w-full h-full rounded-full" src={LogoWhite} alt="" />
          </div>
          <div className="ml-3">
            <Link to={`/user/${username}`} target="_blank">
              <p className="text-gray-900 whitespace-no-wrap">{username} </p>
            </Link>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{updatedAt}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{score}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm uppercase">
        <div className="flex justify-end">
          <p
            className={`text-white whitespace-no-wrap bg-${
              status === 'completed' ? 'green' : status === 'failed' ? 'red' : 'purple'
            }-600 text-white px-2 py-1 rounded-lg`}
          >
            {status}
          </p>
        </div>
      </td>
    </tr>
  );
};
const Leaderboard: React.FC<ILeaderboard> = (SubmissionInfo) => {
  const {
    challenge: { challengeId },
    isContestBased,
    contestId,
  } = SubmissionInfo;
  const [submissionState, setSubmissionState] = useState<ILeaderboardState>({
    isLoading: false,
    submissions: [],
  });
  const AuthState = useSelector((state) => state['Auth'].data);
  const token = AuthState.user.token.toString();

  const getSubmissions = async () => {
    if (isContestBased) {
      // handle the conteste submissisons of the rebororyt
      const submissionRes = await getContestChallengeLeaderboard({
        challengeId: Number(challengeId),
        contestId: Number(contestId),
        token,
      });
      if (!submissionRes.isSuccess) throw new Error(submissionRes.message || 'Cannot get submission');
      return submissionRes.response.submissions;
    } else {
      const submissionRes = await getChallengeLeaderboard({
        challengeId: parseInt(challengeId),
        token,
      });
      if (!submissionRes.isSuccess) throw new Error(submissionRes.message || 'Cannot get submission');
      return submissionRes.response.submissions;
    }
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
  console.log({ sub: submissionState.submissions });
  return (
    <div>
      <div className="bg-white shadow-xl">
        <div className="mx-auto">
          <div className="inputs w-full max-w-6xl p-6">
            <h2 className="text-3xl text-gray-900">Leaderboard</h2>
            <p className="text-sm md:text-base text-gray-600 italic mt-2 mb-4">
              Current Leaderbord of the challenge based upon the points
            </p>
            {submissionState.isLoading ? (
              <CustomLoader />
            ) : (
              <form className="border-t border-gray-400 pt-8">
                <div className="-mx-3 mb-6">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 w-1/2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-5 py-3 w-1/4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-5 py-3 w-1/4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Score
                        </th>
                        <th className="px-5 py-3 w-1/4 text-right  border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    {submissionState.submissions && submissionState.submissions.length > 0 ? (
                      <tbody>
                        {submissionState.submissions.map((sub, indx) => (
                          <SubmissionRow
                            username={sub['user_username']}
                            score={sub['submission_score']}
                            key={indx}
                            updatedAt={sub['submission_updatedAt']}
                            status={sub['submission_status']}
                          />
                        ))}
                      </tbody>
                    ) : (
                      <p>Noone has submitted at the moment!</p>
                    )}
                  </table>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
