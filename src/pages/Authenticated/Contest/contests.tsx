import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import classnames from 'classnames';

import { history } from 'utils/History';
import { searchContest } from 'api';

import Button from 'components/Common/Button';
import CustomPaginate from 'components/Common/CustomPaginaton';

import moment from 'moment';

interface ListItemProps {
  title: string;
  difficulty?: string;
  onClick: () => void;
  createdAt: string;
  description: string;
}
interface IContestTab {
  name: 'enrolled' | 'active' | 'archived';
  selected: 'enrolled' | 'active' | 'archived';
  title: 'Enrolled' | 'Active' | 'Archived';
  onPress: any;
  left?: boolean;
  right?: boolean;
}

const ContestTabPill: React.FC<IContestTab> = ({ name, title, selected, onPress, left, right }) => (
  <p
    onClick={() => onPress(name)}
    aria-current="page"
    className={classnames(
      ' transition duration-500 ease-in-out hover:text-primary',
      selected === name ? 'text-primary' : 'text-gray-500',
      'group relative min-w-0 flex-1 overflow-hidden bg-white cursor-pointer py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
      left && 'rounded-l-lg',
      right && 'rounded-r-lg',
    )}
  >
    <span>{title}</span>
    <span
      aria-hidden="true"
      className={classnames('absolute inset-x-0 bottom-0 h-1', name === selected ? 'bg-primary' : 'bg-transparent')}
    ></span>
  </p>
);

const ListItem: React.FC<ListItemProps> = ({ title, description, onClick, difficulty, createdAt }) => (
  <li className="cursor-pointer transition duration-500 ease-in-out  hover:bg-gray-200 transform hover:-translate-y-1 hover:scale-20">
    <div onClick={onClick} className="block hover:bg-gray-50">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-primary truncate">{title}</p>
          <div className="ml-2 flex-shrink-0 flex">
            <p className="capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {difficulty}
            </p>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <p className="flex items-center text-sm text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                data-todo-x-description="Heroicon name: solid/users"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              {description}
            </p>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <svg
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              data-todo-x-description="Heroicon name: solid/calendar"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p>
              Created:{/* space */}
              <time dateTime={createdAt}>{` ` + moment(createdAt).format('YYYY/MM/DD')}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  </li>
);

const Contest: React.FC<RouteComponentProps> = (RouteProps) => {
  const AuthState = useSelector((state) => state['Auth']);
  const {
    location: { pathname },
  } = RouteProps;
  // handle tab initialization with tab name
  const [selectedTab, setSelectedTab] = useState<'enrolled' | 'active' | 'archived'>(
    pathname.includes('active') ? 'active' : pathname.includes('archived') ? 'archived' : 'enrolled',
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState(10);
  const [challenges, setChallenges] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [contests, setContests] = useState([]);
  const [isChallengeLoading, setIsChallengeLoading] = useState(false);

  const handlePaginationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPagination(parseInt(event.target.value));
  };

  const handlePageClick = (data) => {
    setCurrentPage(parseInt(data.selected) + 1);
  };

  const getChallengeInfo = async () => {
    const options = {
      token: AuthState.data.user.token,
      limit: pagination,
      page: currentPage,
      type: 'contests',
      status: selectedTab,
    };
    if (searchQuery.length > 0) {
      options['query'] = searchQuery;
    }
    const challengesRes = await searchContest(options);
    if (!challengesRes.isSuccess) throw new Error(challengesRes.message);
    const { contests, totalPages } = challengesRes.response.data;
    setChallenges(challenges);
    setTotalPages(totalPages);
    setChallenges(challengesRes.response.data.contests);
    setIsChallengeLoading(true);
  };

  const handlePageInitiaiton = async () => {
    try {
      setIsChallengeLoading(true);
      await getChallengeInfo();
    } catch (err) {
      toast.error(err.message);
      setIsChallengeLoading(true);
    }
  };
  useEffect(() => {
    handlePageInitiaiton();
  }, []);

  useEffect(() => {
    handlePageInitiaiton();
  }, [searchQuery, pagination, currentPage]);

  useEffect(() => {
    handlePageInitiaiton();
    setCurrentPage(1);
  }, [setSelectedTab, selectedTab]);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
        <div className="w-full lg:w-2/3 mx-auto ">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-primary-500 focus:border-primary border-gray-300 rounded-md hover:border-indigo-600"
              >
                <option selected={selectedTab === 'enrolled'}>Enrolled</option>
                <option selected={selectedTab === 'active'}>Active</option>
                <option selected={selectedTab === 'archived'}>Archieved</option>
              </select>
              {/* <select className="form-select block w-full">
                <option selected={selectedTab === 'enrolled'} onClick={() => setSelectedTab('enrolled')}>
                  Enrolled
                </option>
                <option selected={selectedTab === 'active'} onClick={() => setSelectedTab('active')}>
                  Active
                </option>
                <option selected={selectedTab === 'archived'} onClick={() => setSelectedTab('archived')}>
                  Archived
                </option>
              </select> */}
            </div>
            <div className="hidden sm:block">
              <nav className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
                <ContestTabPill left name="enrolled" title="Enrolled" onPress={setSelectedTab} selected={selectedTab} />
                <ContestTabPill name="active" title="Active" onPress={setSelectedTab} selected={selectedTab} />
                <ContestTabPill
                  right
                  name="archived"
                  title="Archived"
                  onPress={setSelectedTab}
                  selected={selectedTab}
                />
              </nav>
            </div>
            {/* <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                  <ContestTab name="enrolled" title="Enrolled" onPress={setSelectedTab} selected={selectedTab} />
                  <ContestTab name="active" title="Active" onPress={setSelectedTab} selected={selectedTab} />
                  <ContestTab name="archived" title="Archived" onPress={setSelectedTab} selected={selectedTab} />
                </nav>
              </div>
            </div> */}
          </div>
          <div>
            <div className="mt-5">
              <div className="py-1">
                <div className="my-2  ">
                  <div className="flex flex-row mb-1 sm:mb-0 justify-between ">
                    <div className="flex flex-row">
                      <div className="flex">
                        <div className="relative">
                          <select
                            value={pagination}
                            onChange={handlePaginationChange}
                            className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="block relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                          </svg>
                        </span>
                        <input
                          placeholder="Search"
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row  items-center m-0 justify-center content-center ">
                      <CustomPaginate totalPages={totalPages} handlePageClick={handlePageClick} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {challenges.length > 0 ? (
                      <div>
                        {challenges.map((challenge, indx) => (
                          <ListItem
                            description={challenge.contest_description}
                            createdAt={challenge.contest_createdAt}
                            key={indx.toString()}
                            difficulty={challenge.contest_difficulty}
                            onClick={() => history.push('/join/' + challenge.contest_contestId)}
                            title={challenge.contest_name}
                          />
                        ))}
                      </div>
                    ) : (
                      <h2>Contests Unavailable</h2>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-dotted my-10"></div>
        </div>

        <div className="w-full lg:w-1/3 px-3">
          <div className="mb-4">
            <div className="border border-dotted"></div>
            <div className="p-1 mt-4 mb-4 relative">
              <h5 className="font-bold text-lg uppercase text-gray-700 mb-2"> Administration </h5>
              <Button
                title="Create Contest"
                color="blue-700"
                onClick={() => history.push('/administration/contests/create')}
              />
              <Button
                title="Manage Contests"
                color="gray-700"
                classNames="mt-2"
                onClick={() => history.push('/administration/contests')}
              />
            </div>
          </div>
          <div className="border border-dotted"></div>
          <div className="p-1 mt-4 mb-4">
            <h5 className="font-bold text-lg uppercase text-gray-700 mb-2"> Subscribe </h5>
            <p className="text-gray-600">Subscribe to our newsletter to get notified for upcoming contests.</p>
            <input
              placeholder="your email address"
              className="text-gray-700 bg-gray-100 rounded-t hover:outline-none p-2 w-full mt-4 border"
            />
            <Button title="Subscribe" color="gray-700" classNames="mt-2" />
          </div>
          <div className="border border-dotted"></div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
