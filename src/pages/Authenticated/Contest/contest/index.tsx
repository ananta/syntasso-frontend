import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useRouteMatch, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getContestChallenges, getContestInfo } from 'api';

import SectionHeader from 'components/Common/SectionHeader';
import NotFound from 'components/Common/NotFound';
import CustomLoader from 'components/Common/CustomLoader';

import Sidebar from './Components/Sidebar';
import Challenges from './Components/Challenges';
import Submissions from './Components/Submissions';
import Leaderboard from './Components/Leaderboard';
import Enrollments from './Components/Enrollments';
import Bookmark from 'components/Common/Bookmark';
import useBookmark from 'hooks/useBookmark';
import moment from 'moment';

type IContest = {
  contestId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  difficulty: string;
  authorId: string;
};

const Contest: React.FC<RouteComponentProps> = (RouteProps) => {
  const {
    location: { pathname },
  } = RouteProps;
  const {
    url,
    params: { contestId },
  } = useRouteMatch<IContest>();
  const [contestInfo, setContestInfo] = useState<IContest>({
    contestId: '0',
    name: '',
    description: '',
    startTime: new Date().toString(),
    endTime: new Date().toString(),
    difficulty: '',
    authorId: '',
  });
  const AuthState = useSelector((state) => state['Auth']);
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(false);
  const [isContestLoading, setIsContestLoading] = useState(true);
  const token = AuthState.data.user.token;
  const getChallengeInfo = async () => {
    const challengesRes = await getContestChallenges({
      contestId: parseInt(contestId),
      token,
    });
    if (!challengesRes.isSuccess) throw new Error(challengesRes.message);
    setChallenges(challengesRes.response.challenges);
  };
  const { isBookmarkLoading, isBookmarked, toggle } = useBookmark({
    token,
    contentId: contestId,
    bookmarkType: 'contest',
  });
  const getContestInformation = async () => {
    const contestRes = await getContestInfo({ contestId: parseInt(contestId) });
    if (!contestRes.response.isSuccess) throw new Error(contestRes.response.message);
    setContestInfo(contestRes.response.contest);
  };

  const initializeContest = async () => {
    try {
      setError(false);
      await getContestInformation();
      await getChallengeInfo();
      setIsContestLoading(false);
    } catch (err) {
      setError(true);
      toast.error(err.message);
      setIsContestLoading(false);
    }
  };

  useEffect(() => {
    initializeContest();
  }, []);

  if (isContestLoading) return <CustomLoader />;
  if (error) return <NotFound />;
  return (
    <div className="max-w-screen-xl mx-auto">
      <div>
        <>
          <div className="">
            <div className="max-w-7xl mx-auto">
              <div className="flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-row flex-wrap justify-between mb-2">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate capitalize">
                      {contestInfo.name}
                      {` `}
                    </h2>
                  </div>
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="capitalize mt-2 flex items-center text-sm text-gray-500">
                      <svg
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        data-todo-x-description="Heroicon name: solid/briefcase"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        ></path>
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                      </svg>
                      {contestInfo.difficulty}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      Starts:{` `}
                      {moment(contestInfo.startTime).format('YYYY/MM/DD - HH:MM')}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      Ends:{` `}
                      {moment(contestInfo.endTime).format('YYYY/MM/DD - HH:MM')}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      Duration:
                      {moment(contestInfo.endTime).diff(moment(contestInfo.startTime), 'h')} Hours
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4 flex-wrap justify-center align-middle">
                  <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Bookmark loading={isBookmarkLoading} bookmarked={isBookmarked} toggle={toggle} />
                  </div>

                  {/* Dropdown */}
                  <span
                    data-todo-x-data="{ open: false }"
                    data-todo-at-keydown-escape-stop="open = false"
                    data-todo-at-click-away="open = false"
                    className="ml-3 relative sm:hidden"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="mobile-menu"
                      aria-expanded="false"
                      data-todo-at-click="open = !open"
                      aria-haspopup="true"
                      data-todo-x-bind-aria-expanded="open"
                    >
                      More
                      <svg
                        className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                        data-todo-x-description="Heroicon name: solid/chevron-down"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>

                    <div
                      data-todo-x-description="Dropdown menu, show/hide based on menu state."
                      data-todo-x-show="open"
                      data-todo-x-transition-enter="transition ease-out duration-200"
                      data-todo-x-transition-enter-start="transform opacity-0 scale-95"
                      data-todo-x-transition-enter-end="transform opacity-100 scale-100"
                      data-todo-x-transition-leave="transition ease-in duration-75"
                      data-todo-x-transition-leave-start="transform opacity-100 scale-100"
                      data-todo-x-transition-leave-end="transform opacity-0 scale-95"
                      className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="mobile-menu"
                    >
                      <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        Edit
                      </a>
                      <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                        View
                      </a>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
        <div className="border border-dotted mt-6 mb-4"></div>
      </div>
      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
        <div className="w-full flex-1 lg:w-1/4 pr-3">
          <Switch>
            <Route
              path={`${url}/submissions`}
              render={(props) => <Submissions contestId={parseInt(contestId)} {...props} />}
            />
            <Route
              path={`${url}/leaderboard`}
              render={(props) => <Leaderboard contestId={parseInt(contestId)} {...props} />}
            />
            <Route
              path={`${url}/enrollments`}
              render={(props) => <Enrollments contestId={parseInt(contestId)} {...props} />}
            />
            <Route
              exact
              path={`${url}/`}
              render={(props) => <Challenges challenges={challenges} url={url} {...props} />}
            />
          </Switch>
          {/* <Challenges /> */}
        </div>
        <Sidebar endTime={contestInfo.endTime} />
      </div>
    </div>
  );
};

export default Contest;
