import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, RouteProps, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { history } from 'utils/History';
import searchChallenge from 'api/methods/searchChallenges';

import SectionHeader from 'components/Common/SectionHeader';
import Button from 'components/Common/Button';
import CustomPaginate from 'components/Common/CustomPaginaton';

import moment from 'moment';
import CustomLoader from 'components/Common/CustomLoader';
import NoPostYet from 'components/Common/NoPostYet';
import Checkbox from 'components/Common/Checkbox';

import usePaginatedList from 'hooks/usePaginatedList';

export interface ChallengeListItemProps {
  title: string;
  description: string;
  difficulty: string;
  createdAt: string;
  onClick: () => void;
}

export const ChallengeListItem: React.FC<ChallengeListItemProps> = ({
  title,
  description,
  onClick,
  difficulty,
  createdAt,
}) => (
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

const Contest: React.FC<RouteComponentProps> = (props: RouteProps) => {
  const searchString: any = qs.parse(props.location.search);
  const [searchQuery] = useState('');
  const [difficulty] = useState('');
  const [pagination] = useState(5);
  const [currentPage] = useState(1);
  const [tags] = useState([
    {
      name: 'Algorithms',
    },
    {
      name: 'Data Structures',
    },
    {
      name: 'Dynamic Programming',
    },
    {
      name: 'Graphs',
    },
    {
      name: 'Sort',
    },
    {
      name: 'Linked List',
    },
  ]);
  const [selectedTags, setSelectedTags] = useState(searchString.tag ? [searchString.tag] : []);
  const {
    isItemsLoading,
    items,
    handlePageClick,
    handlePagination,
    totalPages,
    setDifficulty: handleDifficultyChange,
    setSearchQuery: handleSearchQueryChange,
    currentPagination,
  } = usePaginatedList({
    pagination,
    currentPage,
    searchQuery,
    getDataApi: searchChallenge,
    type: 'challenges',
    difficulty,
    tags: selectedTags,
  });

  console.log(selectedTags);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
        <div className="w-full lg:w-2/3 mx-auto ">
          <div>
            <SectionHeader title="Active Challenges" />
            <div className=" flex flex-row justify-between ">
              <div className="py-1">
                <div className="my-2 flex sm:flex-row flex-col ">
                  <div className="flex flex-row mb-1 sm:mb-0 ">
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
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                        <option>All</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                      </svg>
                    </span>
                    <input
                      placeholder="Search"
                      onChange={(e) => handleSearchQueryChange(e.target.value)}
                      className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                    />
                  </div> */}
                </div>
              </div>

              <CustomPaginate totalPages={totalPages} handlePageClick={(data: any) => handlePageClick(data.selected)} />
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
                            {items.map((challenge, indx) => (
                              <ChallengeListItem
                                createdAt={challenge.challenges_createdAt}
                                key={indx.toString()}
                                difficulty={challenge.challenges_difficulty}
                                onClick={() => history.push('/challenge/' + challenge.challenges_challengeId)}
                                title={challenge.challenges_name}
                                description={challenge.challenges_description}
                              />
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
          <div className="flex flex-row  items-center m-0 justify-center content-center mt-10"></div>
          <div className="border border-dotted my-10"></div>
        </div>

        <div className="w-full lg:w-1/3 px-3">
          <div className="mb-4">
            <div className="border border-dotted"></div>
            <div className="p-1 mt-4 mb-4 relative">
              <h5 className="font-bold text-lg uppercase text-gray-700 mb-2"> Administration </h5>
              <Button
                title="Create Challenge"
                color="blue-700"
                onClick={() => history.push('/administration/challenges/create')}
              />
              <Button
                title="Manage Challenge"
                color="gray-700"
                classNames="mt-2"
                onClick={() => history.push('/administration/challenges')}
              />
            </div>
            <div className="border border-dotted"></div>
            <h5 className="font-bold text-lg uppercase text-gray-700 px-1 mb-2">Difficulty</h5>
            <ul>
              <li
                onClick={() => handleDifficultyChange('easy')}
                className="cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
              >
                <div className="flex items-center text-gray-600 cursor-pointer">
                  <span className="inline-block h-4 w-4 bg-green-300 mr-3"></span>
                  Easy
                  <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                </div>
              </li>
              <li
                onClick={() => handleDifficultyChange('medium')}
                className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
              >
                <div className="flex items-center text-gray-600 cursor-pointer">
                  <span className="inline-block h-4 w-4 bg-indigo-300 mr-3"></span>
                  Medium
                  <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                </div>
              </li>
              <li
                onClick={() => handleDifficultyChange('hard')}
                className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
              >
                <div className="flex items-center text-gray-600 cursor-pointer">
                  <span className="inline-block h-4 w-4 bg-yellow-300 mr-3"></span>
                  Hard
                  <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                </div>
              </li>
            </ul>
          </div>
          <div className="border border-dotted"></div>
          <div className="p-1 mt-4 mb-4">
            <h5 className="font-bold text-lg uppercase text-gray-700 mb-2"> Tags </h5>
            <div className="flex flex-col">
              <ul>
                {tags.map((tag) => (
                  <Checkbox
                    title={tag.name}
                    checked={selectedTags.includes(tag.name)}
                    onCheck={(item) =>
                      selectedTags.includes(item)
                        ? setSelectedTags(selectedTags.filter((_tag) => _tag !== item))
                        : setSelectedTags((tags) => [...tags, item])
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="border border-dotted"></div>
        </div>
      </div>
    </div>
  );
};

export default Contest;
