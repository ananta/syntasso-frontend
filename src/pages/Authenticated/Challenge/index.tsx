import React, { useState, useEffect } from 'react';
import { Route, Switch, RouteComponentProps, useRouteMatch, NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Problem from './Problem';
import Leaderboard from './Leaderboard';
import Submissions from './Submissions';
import { doesChallengeAndContestExists, getChallengeInfo, getContestInfo } from 'api';
import { history } from 'utils/History';
import { toast } from 'react-toastify';
import NotFound from 'components/Common/NotFound';
import CustomLoader from 'components/Common/CustomLoader';

type MatchParams = {
  challengeId: string;
  contestId: string;
};
type ChallengeParams = RouteComponentProps<MatchParams>;

const Challenge: React.FC<ChallengeParams> = (RouteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    url,
    params: { challengeId, contestId },
  } = useRouteMatch<MatchParams>();
  const isContest = url.toString().includes('contest');

  const [error, setError] = useState(false);

  const [contestInfo, setContestInfo] = useState({
    endTime: '',
  });

  const [currentChallenge, setCurrentChallenge] = useState({
    challengeId: '',
    name: '',
    description: '',
    authorId: '',
    problemStatement: '',
    difficulty: '',
    constraints: '',
    sampleInput: '',
    user: {
      username: '',
    },
    sampleOutput: '',
    createdAt: '',
  });

  const {
    location: { pathname },
  } = RouteProps;

  const Auth = useSelector((state) => state['Auth']);

  const checkChallengeContestRelationship = async () => {
    const checkerResponse = await doesChallengeAndContestExists({
      contestId: parseInt(contestId),
      challengeId: parseInt(challengeId),
      token: Auth.data.user.token,
    });
    if (!checkerResponse.response.isSuccess)
      throw new Error(checkerResponse.response.message || 'Problem loading challenge of the contest');
  };

  const getInfoAboutContest = async (contestId: string) => {
    const contestInfoRes = await getContestInfo({
      contestId: parseInt(contestId),
    });
    setContestInfo({
      ...contestInfoRes.response.contest,
    });
  };

  const checkIfChallengeExists = async () => {
    const challengeRes = await getChallengeInfo({
      token: Auth.data.user.token,
      challengeId,
    });
    console.log({ challengeRes });
    if (!challengeRes.isSuccess) throw new Error(challengeRes.message);
    if (url === pathname) {
      if (url[url.length - 1] === '/') {
        history.replace(url + 'problem');
      } else {
        history.replace(url + '/problem');
      }
    }
    setCurrentChallenge(challengeRes.response.challenge);
  };

  const handleChallengeInitiation = async () => {
    try {
      setIsLoading(true);
      if (isContest) {
        await checkChallengeContestRelationship();
        await getInfoAboutContest(contestId);
      }
      await checkIfChallengeExists();
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    handleChallengeInitiation();
  }, []);

  if (isLoading) return <CustomLoader />;
  if (error) return <NotFound />;

  return (
    <>
      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mb-10 ">
        <div className=" w-full lg:w-3/4 mx-auto ">
          <ul className="flex border-b bg-gray-200">
            <NavLink
              activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
              activeClassName={
                'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'
              }
              to={`${url}/problem`}
              className="bg-gray-200  inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
            >
              <li className="-mb-px mr-1">Problem</li>
            </NavLink>
            <NavLink
              activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
              activeClassName={
                'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'
              }
              to={`${url}/leaderboard`}
              className="bg-gray-200 inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
            >
              <li className="mr-1">Leaderboard</li>
            </NavLink>
            {/* {isContest && ( */}
            <NavLink
              activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
              activeClassName={
                'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'
              }
              to={`${url}/submissions`}
              className="bg-gray-200 inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
            >
              <li className="mr-1">Submissions</li>
            </NavLink>
            {/* )} */}
          </ul>
          {currentChallenge.challengeId && (
            <>
              <div className="">
                <div className="">
                  <Switch>
                    <Route
                      path={`${url}/problem`}
                      render={(props) => (
                        <Problem
                          {...props}
                          challenge={currentChallenge}
                          isContestBased={isContest}
                          contestId={parseInt(contestId)}
                          contestInfo={contestInfo}
                        />
                      )}
                    />
                    <Route
                      path={`${url}/leaderboard`}
                      render={(props) => (
                        <Leaderboard
                          {...props}
                          challenge={currentChallenge}
                          isContestBased={isContest}
                          contestId={parseInt(contestId)}
                        />
                      )}
                    />
                    <Route
                      path={`${url}/submissions`}
                      render={(props) => (
                        <Submissions {...props} challenge={currentChallenge} isContestBased={isContest} />
                      )}
                    />
                    <Route component={() => <div>NOT FOUND</div>} />
                  </Switch>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="w-full lg:w-1/4 px-3">
          <div className="mb-4">
            <div className="p-1  mb-4 relative">
              <h5 className="font-bold text-lg uppercase text-gray-700 mb-2">About</h5>
              <ul>
                <li onClick={() => false} className="cursor-pointer px-1 py-4 transition duration-300">
                  <div className="flex justify-between text-gray-600 cursor-pointer">
                    <p>Author</p>
                    <Link to={`/user/${currentChallenge.user.username}`}>
                      <p className="text-blue-600">{currentChallenge.user.username}</p>
                    </Link>
                  </div>
                  <div className="flex mt-4 justify-between text-gray-600 cursor-pointer">
                    <p>Created At</p>
                    <p className="text-blue-600 ">{currentChallenge.createdAt}</p>
                  </div>
                  <div className="flex mt-4 justify-between text-gray-600 cursor-pointer">
                    <p>Submissions</p>
                    <Link to={`${url}/submissions`}>
                      <p className="text-blue-600 ">Your Submissions</p>
                    </Link>
                  </div>
                  <div className="flex mt-4 justify-between text-gray-600 cursor-pointer">
                    <p>Leaderboard</p>
                    <Link to={`${url}/leaderboard`}>
                      <p className="text-blue-600 ">Global Leaderboard</p>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="border border-dotted"></div>
            <h5 className="font-bold text-lg uppercase text-gray-700 px-1 mb-2">Difficulty</h5>
            <ul>
              <li
                onClick={() => false}
                className="cursor-pointer px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300"
              >
                <div className="flex items-center text-gray-600 cursor-pointer capitalize">
                  <span className="inline-block h-4 w-4 bg-green-300 mr-3"></span>
                  {currentChallenge.difficulty}
                  <i className="text-gray-500 bx bx-right-arrow-alt ml-1"></i>
                </div>
              </li>
            </ul>
          </div>
          <div className="border border-dotted"></div>
          <div className="p-1 mt-4 mb-4">
            <h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Share</h5>
            <div className="flex items-center  mt-4">
              <a className="mr-2 text-gray-800 hover:text-gray-700 cursor-pointer">
                <svg className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z" />
                </svg>
              </a>

              <a className="mr-2 text-gray-800 hover:text-gray-700 cursor-pointer">
                <svg
                  className="h-8 w-8 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.8283 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.5089 3.3668 14.9762 3.3668 13.4141 4.9289L10.5857 7.75732L11.9999 9.17154L14.8283 6.34311C15.6094 5.56206 16.8757 5.56206 17.6568 6.34311C18.4378 7.12416 18.4378 8.39049 17.6568 9.17154L14.8283 12Z" />
                  <path d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02365 20.6332 6.49099 20.6332 4.9289 19.0711C3.3668 17.509 3.3668 14.9764 4.9289 13.4143L7.75732 10.5858L9.17154 12L6.34311 14.8285C5.56206 15.6095 5.56206 16.8758 6.34311 17.6569C7.12416 18.4379 8.39049 18.4379 9.17154 17.6569L12 14.8285Z" />
                  <path d="M14.8284 10.5857C15.2189 10.1952 15.2189 9.56199 14.8284 9.17147C14.4379 8.78094 13.8047 8.78094 13.4142 9.17147L9.17154 13.4141C8.78101 13.8046 8.78101 14.4378 9.17154 14.8283C9.56206 15.2188 10.1952 15.2188 10.5857 14.8283L14.8284 10.5857Z" />
                </svg>
              </a>

              <a className="mr-2 text-gray-800 hover:text-gray-700 cursor-pointer">
                <svg className="h-8 w-8 fill-current" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1579 128q35 0 60 25t25 60v1366q0 35-25 60t-60 25h-391v-595h199l30-232h-229v-148q0-56 23.5-84t91.5-28l122-1v-207q-63-9-178-9-136 0-217.5 80t-81.5 226v171h-200v232h200v595h-735q-35 0-60-25t-25-60v-1366q0-35 25-60t60-25h1366z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="border border-dotted"></div>
        </div>
      </div>
    </>
  );
};

export default Challenge;
