import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getUserEnrollments, getUserInfo, getUserSubmissions } from 'api';
import { history } from 'utils/History';

import CustomLoader from 'components/Common/CustomLoader';
import NotFound from 'components/Common/NotFound';
import Button from 'components/Common/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { GiBrain } from 'react-icons/gi';
import { MdAccountCircle } from 'react-icons/md';
import TimelineListItem from './Components/TimelineListItem';
import getUserTimeline from 'api/methods/getUserTimeline';
import usePaginatedFetcher from 'hooks/usePaginatedFetcher';
import { BASE_URL } from 'api/EndPoint';
import NoPostYet from 'components/Common/NoPostYet';
import TimeAgoGenerator from 'utils/TimeAgoGenerator';

type IUserInfo = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  email: string;
  isActive: string;
  isVerified: string;
};

const Profile: React.FC<RouteComponentProps> = (RouteProps) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const {
    url,
    params: { username },
  } = useRouteMatch<IUserInfo>();
  const [timeline, setTimeline] = useState(null);
  const AuthState = useSelector((state) => state['Auth']);
  const token = AuthState.data.user.token;
  const enrollments = usePaginatedFetcher({
    fetcherFunction: getUserEnrollments,
    name: ['contests', 'enrollments'],
    username,
    token,
    limit: 2,
  });
  const submissions = usePaginatedFetcher({
    fetcherFunction: getUserSubmissions,
    name: ['result', 'submissions'],
    username,
    token,
    limit: 5,
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    createdAt: '',
    email: '',
    isActive: 'false',
    isVerified: 'false',
  });
  const [error, setError] = useState(false);

  const fetchUserInfo = async () => {
    const userRes = await getUserInfo({
      username,
      token,
    });
    if (!userRes.isSuccess) throw new Error(userRes.message || userRes.response.message);
    setUserInfo(userRes.response.data);
  };

  const fetchTimeline = async () => {
    const timelineRes = await getUserTimeline({
      username,
      token,
    });
    if (!timelineRes.isSuccess) throw new Error(timelineRes.message || timelineRes.response.message);
    setTimeline(timelineRes.response.timeline);
  };

  const handleInitiation = async () => {
    try {
      setIsPageLoading(true);
      setError(false);
      await fetchUserInfo();
      await fetchTimeline();
      console.log({ userInfo });
      console.log('Page initialized');
    } catch (err) {
      console.log({ err });
      setError(true);
      toast.error(err.message);
    }
    setIsPageLoading(false);
  };

  useEffect(() => {
    handleInitiation();
  }, []);

  if (error) return <NotFound />;
  if (isPageLoading) return <CustomLoader />;

  return (
    <>
      <div>
        <div className="min-h-screen ">
          <main className="py-10">
            {/* Page header */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <MdAccountCircle className="h-12 w-12 text-gray-800" />
                    <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{userInfo.firstName + ' ' + userInfo.lastName}</h1>
                  <p className="text-sm font-medium text-gray-500">
                    Registered Username:{' '}
                    <p
                      className="inline text-gray-900 cursor-pointer"
                      onClick={() => history.replace(`/profile/${userInfo.username}`)}
                    >
                      {userInfo.username}
                    </p>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                <button
                  onClick={() => alert('Coming soon')}
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                        User Information
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details of the user.</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Profile for</dt>
                          <dd className="mb-1 text-sm text-gray-900">{userInfo.username}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email address</dt>
                          <dd className="mb-1 text-sm text-gray-900">{userInfo.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                          <dd className="mb-1 text-sm text-gray-900">$XXXXXXXXXXXXX</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="mb-1 text-sm text-gray-900">+XXXXXXXXXXX</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">About</dt>
                          <dd className="mb-1 text-sm text-gray-900">
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                            XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="notes-title">
                  <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                    <div className="divide-y divide-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                          Enrollments
                        </h2>
                      </div>
                      <div className="px-4 py-6 sm:px-6">
                        <ul className="space-y-8">
                          {enrollments.data.map((enrollment) => (
                            <li>
                              <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                  <AccountCircle className="h-10 w-10 rounded-full" />
                                </div>
                                <div>
                                  <div className="text-sm">
                                    <a href="/" className="font-medium text-gray-900">
                                      {enrollment.contest_name}
                                    </a>
                                  </div>
                                  <div className="mt-1 text-sm text-gray-700">
                                    <p>{enrollment.contest_description}</p>
                                  </div>
                                  <div className="mt-2 text-sm space-x-2">
                                    <span className="text-gray-500 font-medium">
                                      {moment.duration(moment().diff(enrollment.enrollment_createdAt)).days() !== 0
                                        ? moment.duration(moment().diff(enrollment.enrollment_createdAt)).days() +
                                          ' days ago'
                                        : moment.duration(moment().diff(enrollment.enrollment_createdAt)).hours() !== 0
                                        ? moment.duration(moment().diff(enrollment.enrollment_createdAt)).hours() +
                                          ' hours ago'
                                        : moment.duration(moment().diff(enrollment.enrollment_createdAt)).minutes() +
                                          ' minutes ago'}{' '}
                                    </span>
                                    <span className="text-gray-500 font-medium">·</span>
                                    <Link
                                      target="_blank"
                                      className="text-gray-900 font-medium"
                                      to={`/join/${enrollment.contest_contestId}`}
                                    >
                                      View
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}

                          {!(enrollments.data.length > 0) && <NoPostYet title="User hasn't enrolled in any contest!" />}
                        </ul>
                      </div>
                      <div className="flex bg-gray-50 px-4 pt-3 mb-3 sm:px-6 justify-end">
                        <div className="inline-block">
                          <Button
                            isBusy={enrollments.isBusy}
                            disabled={enrollments.totalPages <= enrollments.currentPage}
                            onClick={enrollments.handleFetchMore}
                            title="Load more"
                            classNames="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="notes-title">
                  <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                    <div className="divide-y divide-gray-200">
                      <div className="px-4 py-5 sm:px-6">
                        <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                          Submissions
                        </h2>
                      </div>
                      <div className="">
                        <div className="bg-gray-100">
                          <div className="max-w-7xl mx-auto ">
                            <div className="flex flex-col">
                              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                  <div className="">
                                    <table className="min-w-full divide-y divide-gray-200">
                                      <thead className="bg-gray-50">
                                        <tr>
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
                                            Contest
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                          >
                                            Status
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                          >
                                            Date
                                          </th>
                                          <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Points</span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white divide-y divide-gray-200" data-todo-x-max="1">
                                        {submissions.data.map((submission, indx) => (
                                          <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                  <GiBrain className="h-10 w-10 rounded-full text-gray-800" />
                                                </div>
                                                <div className="ml-4">
                                                  <div className="text-sm font-medium text-gray-900 truncate w-40">
                                                    {submission.challenge_name}
                                                  </div>
                                                  <div className="text-sm text-gray-500 truncate w-48">
                                                    {submission.challenge_description}
                                                  </div>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              {submission.contest_name ? (
                                                <>
                                                  <div className="text-sm text-gray-900 truncate w-24 ">
                                                    {submission.contest_name}
                                                  </div>

                                                  <Link
                                                    target="_blank"
                                                    to={`/join/${submission.contest_contestId}`}
                                                    className="text-sm text-gray-500"
                                                  >
                                                    View
                                                  </Link>
                                                </>
                                              ) : (
                                                <div className="text-sm text-gray-900">--</div>
                                              )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                              <span
                                                className={`capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full${
                                                  submission.submissions_status === 'completed'
                                                    ? 'bg-green-100 text-green-800 '
                                                    : 'bg-red-100 text-red-800'
                                                } `}
                                              >
                                                {submission.submissions_status}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                              {TimeAgoGenerator({ time: submission.submissions_createdAt })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                              <a href="/" className="text-green-600 hover:text-indigo-900">
                                                {submission.submissions_score > 0 && `+`} {submission.submissions_score}
                                              </a>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                    {!(submissions.data.length > 0) && (
                                      <NoPostYet title="User hasn't submitted any code" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex bg-gray-50 px-4 pt-3 mb-3 sm:px-6 justify-end">
                        <div className="inline-block">
                          <Button
                            isBusy={submissions.isBusy}
                            disabled={submissions.totalPages <= submissions.currentPage}
                            onClick={submissions.handleFetchMore}
                            title="Load more"
                            classNames="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                    Timeline
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul className="-mb-8">
                      {timeline.map((event: { type: 'joined' | 'award'; time: string }) => (
                        <TimelineListItem {...event} />
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch">
                    <a
                      href={`${BASE_URL}/timeline/${userInfo.username}`}
                      target="__blank"
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Generate Portfolio
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
