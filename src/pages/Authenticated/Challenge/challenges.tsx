import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Logo from 'shared/assets/images/logo-white.png';
import SectionHeader from 'components/Common/SectionHeader';
import Button from 'components/Common/Button';
import { history } from 'utils/History';
import searchChallenge from 'api/methods/searchChallenges';

interface ListItemProps {
  title: string;
  description: string;
  difficulty: string;
  onClick: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ title, description, onClick, difficulty }) => (
  <div className="bg-white px-4 py-2 rounded-l w-full lg:flex mb-10 cursor-pointer" onClick={onClick}>
    <div className=" rounded px-4 flex flex-col justify-between leading-normal">
      <div>
        <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="flex mt-3">
        <img src={Logo} className="h-10 w-10 rounded-full mr-2 object-cover" />
        <div>
          <p className="font-semibold text-gray-700 text-sm capitalize"> weekly competition </p>
          <p className="text-gray-600 text-xs"> 14 Aug </p>
        </div>
      </div>
    </div>
  </div>
);

const Contest: React.FC<RouteComponentProps> = () => {
  const AuthState = useSelector((state) => state['Auth']);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [contests, setContests] = useState([]);
  const [isChallengeLoading, setIsChallengeLoading] = useState(false);

  const getChallengeInfo = async () => {
    const options = {
      token: AuthState.data.user.token,
      limit: 20,
      page: 1,
      type: 'challenges',
    };
    if (searchQuery.length > 0) {
      options['query'] = searchQuery;
    }
    if (difficulty.length > 0) {
      options['difficulty'] = difficulty;
    }
    const challengesRes = await searchChallenge(options);
    if (!challengesRes.isSuccess) throw new Error(challengesRes.message);
    setChallenges(challengesRes.response.data.challenges);
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
  }, [searchQuery, difficulty]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
        <div className="w-full lg:w-2/3 mx-auto ">
          <div>
            <SectionHeader title="Active Challenges" />
            <div className="mb-5">
              <div className="py-1">
                <div className="my-2 flex sm:flex-row flex-col ">
                  <div className="flex flex-row mb-1 sm:mb-0 ">
                    <div className="relative">
                      <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
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
              </div>
            </div>
            {challenges.length > 0 ? (
              <div>
                {challenges.map((challenge, indx) => (
                  <ListItem
                    key={indx.toString()}
                    difficulty={challenge.challenges_difficulty}
                    onClick={() => history.push('/challenge/' + challenge.challenges_challengeId)}
                    title={challenge.challenges_name}
                    description={challenge.challenges_description}
                  />
                ))}
              </div>
            ) : (
              <h2>There are not Active Contests running at the moment.</h2>
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
                onClick={() => setDifficulty('easy')}
                className="cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
              >
                <div className="flex items-center text-gray-600 cursor-pointer">
                  <span className="inline-block h-4 w-4 bg-green-300 mr-3"></span>
                  Easy
                  <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                </div>
              </li>
              <li
                onClick={() => setDifficulty('medium')}
                className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
              >
                <div className="flex items-center text-gray-600 cursor-pointer">
                  <span className="inline-block h-4 w-4 bg-indigo-300 mr-3"></span>
                  Medium
                  <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                </div>
              </li>
              <li
                onClick={() => setDifficulty('hard')}
                className=" cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
              >
                <div className="flex items-center text-gray-600 cursor-pointer">
                  <span className="inline-block h-4 w-4 bg-yellow-300 mr-3"></span>
                  Hard
                  <span className="text-gray-500 ml-auto">10 contests</span>
                  <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                </div>
              </li>
            </ul>
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
