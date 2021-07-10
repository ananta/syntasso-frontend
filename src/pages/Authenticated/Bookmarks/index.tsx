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
import NoPostYet from 'components/Common/NoPostYet';
import CustomLoader from 'components/Common/CustomLoader';
import usePaginatedList from 'hooks/usePaginatedList';
import TabNavigator from 'components/Common/TabNavigator';
import { ChallengeListItem, ChallengeListItemProps } from 'pages/Authenticated/Challenge/challenges';
import { ContestListItem, ContestListItemProps } from 'pages/Authenticated/Contest/contests';
import searchBookmarks from 'api/methods/searchBookmarks';

const Bookmarks: React.FC<RouteComponentProps> = (RouteProps) => {
  const {
    location: { pathname },
  } = RouteProps;
  // handle tab initialization with tab name
  const [selectedTab, setSelectedTab] = useState<'contest' | 'challenge'>(
    pathname.includes('contest') ? 'contest' : 'challenge',
  );
  const [searchQuery] = useState('');
  const [pagination] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    isItemsLoading,
    handlePageClick,
    handlePagination,
    totalPages,
    items,
    currentPagination,
    setSearchQuery,
    handlePageInitiaiton,
  } = usePaginatedList({
    pagination,
    currentPage,
    searchQuery,
    getDataApi: searchBookmarks,
    type: 'bookmarks',
    bookmarkType: selectedTab,
  });

  useEffect(() => {
    handlePageInitiaiton();
    setCurrentPage(1);
  }, [setSelectedTab, selectedTab]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
        <div className="w-full lg:w-2/3 mx-auto ">
          <div>
            <div className="sm:block">
              <TabNavigator
                onTabChange={setSelectedTab}
                selectedTab={selectedTab}
                items={[
                  {
                    name: 'challenge',
                    title: 'Challenges',
                  },

                  {
                    name: 'contest',
                    title: 'Contests',
                  },
                ]}
              />
            </div>
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
                            value={currentPagination}
                            onChange={handlePagination}
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
                      <CustomPaginate
                        totalPages={totalPages}
                        handlePageClick={(data: any) => handlePageClick(data.selected)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {isItemsLoading ? (
                      <CustomLoader />
                    ) : (
                      <>
                        {items.length > 0 ? (
                          <div>
                            {items.map((item, indx) => (
                              <>
                                {selectedTab === 'challenge' ? (
                                  <ChallengeListItem
                                    createdAt={item.challenges_createdAt}
                                    key={indx.toString()}
                                    difficulty={item.challenges_difficulty}
                                    onClick={() => history.push('/challenge/' + item.challenges_challengeId)}
                                    title={item.challenges_name}
                                    description={item.challenges_description}
                                  />
                                ) : (
                                  <ContestListItem
                                    description={item.contest_description}
                                    createdAt={item.contest_createdAt}
                                    key={indx.toString()}
                                    difficulty={item.contest_difficulty}
                                    onClick={() => history.push('/join/' + item.contest_contestId)}
                                    title={item.contest_name}
                                  />
                                )}
                              </>
                            ))}
                          </div>
                        ) : (
                          <NoPostYet />
                        )}
                      </>
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
            <p className="text-gray-600">Subscribe to our newsletter and get notified about upcoming contests.</p>
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

export default Bookmarks;
