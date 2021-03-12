import React, { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import classnames from 'classnames';
import Logo from 'shared/assets/images/logo-white.png';
import Button from 'components/Common/Button';
import { history } from 'utils/History';
import { searchContest } from 'api';
import CustomPaginate from 'components/Common/CustomPaginaton';

interface ListItemProps {
  title: string;
  difficulty?: string;
  onClick: () => void;
}
interface IContestTab {
  name: 'enrolled' | 'active' | 'archived';
  selected: 'enrolled' | 'active' | 'archived';
  title: 'Enrolled' | 'Active' | 'Archived';
  onPress: any;
  left?: boolean;
  right?: boolean;
}
const ContestTab: React.FC<IContestTab> = ({ name, title, selected, onPress }) => (
  <p
    onClick={() => onPress(name)}
    className={classnames('w-1/3 py-4 px-1 text-center border-b-2  font-medium text-sm leading-5 cursor-pointer', {
      'border-primary text-primary focus:text-primary focus:border-primary': name === selected,
      'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300':
        name !== selected,
    })}
  >
    {title}
  </p>
);

const ContestTabPill: React.FC<IContestTab> = ({ name, title, selected, onPress, left, right }) => (
  <p
    onClick={() => onPress(name)}
    aria-current="page"
    className={classnames(
      selected === name ? 'text-gray-900' : 'text-gray-500',
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

const ListItem: React.FC<ListItemProps> = ({ title, onClick, difficulty }) => (
  <div className="bg-white px-4 py-2 rounded-l w-full lg:flex mb-10 cursor-pointer" onClick={onClick}>
    <div className=" rounded px-4 flex flex-col justify-between leading-normal">
      <div>
        <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">{title}</div>
      </div>
      <div className="flex mt-3">
        <img src={Logo} className="h-10 w-10 rounded-full mr-2 object-cover" />
        <div>
          <p className="font-semibold text-gray-700 text-sm capitalize"> {difficulty} </p>
          <p className="text-gray-600 text-xs">Start Time: 02 Aug, 2020 | End TIme: 03 Aug, 2020 </p>
        </div>
      </div>
    </div>
  </div>
);

const Contest: React.FC<RouteComponentProps> = () => {
  const AuthState = useSelector((state) => state['Auth']);
  const [selectedTab, setSelectedTab] = useState<'enrolled' | 'active' | 'archived'>('enrolled');
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
                className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
            {challenges.length > 0 ? (
              <div>
                {challenges.map((contest, indx) => (
                  <ListItem
                    key={indx.toString()}
                    difficulty={contest.contest_difficulty}
                    onClick={() => history.push('/join/' + contest.contest_contestId)}
                    title={contest.contest_name}
                  />
                ))}
              </div>
            ) : (
              <h2>Contests Not Available</h2>
            )}
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
