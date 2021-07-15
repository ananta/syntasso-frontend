import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getContestSubmission } from 'api';
import truncate from 'utils/Truncate';

import { IRoutePropsForContest } from './types';

import LogoWhite from 'shared/assets/images/logo-white.png';
import ContestContainer from './ContestContainer';
import TimeAgoGenerator from 'utils/TimeAgoGenerator';
import NoPostYet from 'components/Common/NoPostYet';
import { ListItemLoader } from 'components/Common/ListItemLoader';

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
  email: string;
  contestId: string;
}

const SubmissionItem: React.FC<ISubmissionItem> = ({
  email,
  username,
  points,
  challengeName,
  challengeId,
  submittedAt,
}) => {
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

const ListItem: React.FC<ISubmissionItem> = ({
  username,
  email,
  challengeName,
  points,
  contestId,
  challengeId,
  submittedAt,
}) => (
  <tr className="table-row transition duration-500 ease-in-out  hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-20">
    <td
      className="px-6 py-4 whitespace-nowrap cursor-pointer"
      onClick={() => window.open(`/profile/${username}`, '_blank')}
    >
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

    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
      onClick={() => window.open(`/contest/${contestId}/challenge/${challengeId}/problem `, '_blank')}
    >
      {challengeName}{' '}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
        {points}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{TimeAgoGenerator({ time: submittedAt })}</td>
  </tr>
);

const Submissions: React.FC<IRoutePropsForContest> = ({ contestId }) => {
  const [submissionState, setSubmissionState] = useState<ISubmissionState>({
    isLoading: false,
    submissions: [],
  });
  const [error, setError] = useState('');
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
    <ContestContainer
      error={error}
      loading={submissionState.isLoading}
      title="Submissions"
      subTitle="Submissions made within the contest"
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
                      Challenge Name
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
                      Submitted At
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 w-full table">
                  {!submissionState.isLoading &&
                    submissionState.submissions.length > 0 &&
                    submissionState.submissions.map((item, index) => (
                      <ListItem
                        key={index}
                        username={item['user_username']}
                        email={item['user_email']}
                        points={item['submission_score']}
                        challengeName={item['challenge_name']}
                        submittedAt={item['submission_createdAt']}
                        challengeId={item['challenge_challengeId']}
                        contestId={item['contest_contestId']}
                      />
                    ))}
                </tbody>
              </table>
              {submissionState.isLoading && <ListItemLoader />}
              {!submissionState.isLoading && !(submissionState.submissions.length > 0) && (
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

export default Submissions;
