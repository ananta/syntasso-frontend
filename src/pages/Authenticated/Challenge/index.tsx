import React, { useState, useEffect } from 'react';
import { Route, Switch, RouteComponentProps, useRouteMatch, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Submissions from './Submissions';
import Problem from './Problem';
import { doesChallengeAndContestExists, getChallengeInfo } from 'api';
import { history } from 'utils/History';
import { toast } from 'react-toastify';
import NotFound from 'components/Common/NotFound';
import CustomLoader from 'components/Common/CustomLoader';

interface MatchParams {
  challengeId: string;
}
type ChallengeParams = RouteComponentProps<MatchParams>;

const Challenge: React.FC<ChallengeParams> = (RouteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    url,
    params: { challengeId, contestId },
  } = useRouteMatch();
  const isContest = url.toString().includes('contest');

  const [error, setError] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState({
    challengeId: '',
    name: '',
    description: '',
    authorId: '',
    problemStatement: '',
    difficulty: '',
    constraints: '',
    sampleInput: '',
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
  const checkIfChallengeExists = async () => {
    const challengeRes = await getChallengeInfo({
      token: Auth.data.user.token,
      challengeId,
    });
    if (!challengeRes.isSuccess) throw new Error(challengeRes.message);
    if (url === pathname) {
      if (url[url.length - 1] === '/') {
        history.push(url + 'problem');
      } else {
        history.push(url + '/problem');
      }
    }
    setCurrentChallenge(challengeRes.response.challenge);
  };

  const handleChallengeInitiation = async () => {
    try {
      setIsLoading(true);
      if (isContest) await checkChallengeContestRelationship();
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
    <div className="bg-white">
      <ul className="flex border-b bg-gray-200">
        <NavLink
          activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
          activeClassName={'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'}
          to={`${url}/problem`}
          className="bg-gray-200  inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
        >
          <li className="-mb-px mr-1">Problem</li>
        </NavLink>
        {isContest && (
          <NavLink
            activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
            activeClassName={'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'}
            to={`${url}/submissions`}
            className="bg-gray-200 inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
          >
            <li className="mr-1">Submissions</li>
          </NavLink>
        )}
      </ul>
      {currentChallenge.challengeId && (
        <div className="bg-white py-6 px-4 border-l border-b border-r">
          <Switch>
            <Route
              path={`${url}/problem`}
              render={(props) => <Problem {...props} challenge={currentChallenge} isContestBased={isContest} />}
            />
            <Route
              path={`${url}/submissions`}
              render={(props) => <Submissions isContestBased={isContest} {...props} />}
            />
            <Route component={() => <div>NOT FOUND</div>} />
          </Switch>
        </div>
      )}
    </div>
  );
};

export default Challenge;
