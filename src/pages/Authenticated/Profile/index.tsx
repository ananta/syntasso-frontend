import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getUserInfo } from 'api';
import { history } from 'utils/History';

import CustomLoader from 'components/Common/CustomLoader';
import NotFound from 'components/Common/NotFound';
import Button from 'components/Common/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { FaUserFriends } from 'react-icons/fa';
import TimelineListItem from './Components/TimelineListItem';
import getUserTimeline from 'api/methods/getUserTimeline';

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
  const AuthState = useSelector((state) => state['Auth']);
  const token = AuthState.data.user.token;
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
                    <img
                      className="h-16 w-16 rounded-full"
                      src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=1024&amp;h=1024&amp;q=80"
                      alt=""
                    />
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
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                  Disqualify
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                >
                  Advance to offer
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
                          <dd className="mt-1 text-sm text-gray-900">{userInfo.username}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email address</dt>
                          <dd className="mt-1 text-sm text-gray-900">{userInfo.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                          <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">About</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa
                            consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in
                            ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui
                            eu.
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                              <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                <div className="w-0 flex-1 flex items-center">
                                  <svg
                                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                                    data-todo-x-description="Heroicon name: solid/paper-clip"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span className="ml-2 flex-1 w-0 truncate">to_be_decided.pdf</span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
                                    Download
                                  </a>
                                </div>
                              </li>
                            </ul>
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
                          Activities
                        </h2>
                      </div>
                      <div className="px-4 py-6 sm:px-6">
                        <ul className="space-y-8">
                          <li>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <AccountCircle className="h-10 w-10 rounded-full" />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <a href="/" className="font-medium text-gray-900">
                                    Leslie Alexander
                                  </a>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>
                                    Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem
                                    maiores. Similique voluptatibus tempore non ut.
                                  </p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">4d ago</span>
                                  <span className="text-gray-500 font-medium">·</span>
                                  <button type="button" className="text-gray-900 font-medium">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <AccountCircle className="h-10 w-10 rounded-full" />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <a href="/" className="font-medium text-gray-900">
                                    Michael Foster
                                  </a>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>
                                    Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem
                                    accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id
                                    explicabo et aut.
                                  </p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">4d ago</span>
                                  <span className="text-gray-500 font-medium">·</span>
                                  <button type="button" className="text-gray-900 font-medium">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>

                          <li>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <AccountCircle className="h-10 w-10 rounded-full" />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <a href="/" className="font-medium text-gray-900">
                                    Dries Vincent
                                  </a>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>
                                    Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem
                                    repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum
                                    et.
                                  </p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">4d ago</span>
                                  <span className="text-gray-500 font-medium">·</span>
                                  <button type="button" className="text-gray-900 font-medium">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <AccountCircle className="h-10 w-10 rounded-full" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <form action="#">
                            <div>
                              <label htmlFor="comment" className="sr-only">
                                About
                              </label>
                              <textarea
                                id="comment"
                                name="comment"
                                rows={3}
                                className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Add a note"
                              ></textarea>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                              <a
                                href="/"
                                className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                              >
                                <svg
                                  className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  data-todo-x-description="Heroicon name: solid/question-mark-circle"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <span>Some HTML is okay.</span>
                              </a>
                              <button
                                type="submit"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Comment
                              </button>
                            </div>
                          </form>
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

                  {/* Activity Feed */}
                  <div className="mt-6 flow-root">
                    <ul className="-mb-8">
                      {timeline.map((event: { type: 'joined' | 'award'; time: string }) => (
                        <TimelineListItem {...event} />
                      ))}
                      {/* <TimelineListItem type="joined" time="2020-12-02" />
                      <TimelineListItem
                        type="award"
                        time="2020-03-15"
                        position="first"
                        points={0}
                        contestName="Gandaki College OF Engineering nad scien andn dal djlkfajs lkfjlk asdjlkfj aklsjdfklj"
                      /> */}
                    </ul>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Generate Portfolio
                    </button>
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
