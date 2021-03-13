import React, { useState, useEffect } from 'react';
import { Route, Switch, RouteComponentProps, useRouteMatch, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isUserAuthorizedToContest } from 'api';
import { history } from 'utils/History';

import Details from './Details';
import ContestChallenges from './Challenges';

interface MatchParams {
  contestId: string;
}

type EditContest = RouteComponentProps<MatchParams>;

interface TabIntemProps {
  title: string;
  to: string;
}
const TabItem: React.FC<TabIntemProps> = ({ title, to }) => (
  <NavLink
    activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
    activeClassName={'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'}
    to={to}
    className=" inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
  >
    <li className="-mb-px mr-1">{title}</li>
  </NavLink>
);

const Challenges: React.FC<EditContest> = (RouteProps) => {
  const { url } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);

  console.log(RouteProps);
  const {
    match: {
      params: { contestId },
    },
    location: { pathname },
  } = RouteProps;
  console.log(url);

  const Auth = useSelector((state) => state['Auth']);
  const checkAuthorization = async () => {
    try {
      setIsLoading(true);
      const authRes = await isUserAuthorizedToContest({
        token: Auth.data.user.token,
        contestId,
      });
      if (!authRes.isSuccess) throw new Error(authRes.message);
      if (url === pathname) {
        if (url[url.length - 1] === '/') {
          history.push(url + 'details');
        } else {
          history.push(url + '/details');
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      history.goBack();
    }
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  return (
    <div>
      <div className="bg-white ">
        <div className="mx-auto">
          <div className="inputs w-full max-w-6xl p-6">
            <h2 className="text-3xl text-gray-900">Edit Contest</h2>
            <div className="my-5">
              <ul className="flex border-b">
                <TabItem title="Details" to={`${url}/details`} />
                <TabItem title="Challenges" to={`${url}/challenges`} />
                <TabItem title="Signups" to={`${url}/signups`} />
                <TabItem title="Statistics" to={`${url}/statistics`} />
              </ul>
            </div>
            <Switch>
              <Route exact path={`${url}/details`} render={(props) => <Details contestId={contestId} {...props} />} />
              <Route
                exact
                path={`${url}/challenges`}
                render={(props) => <ContestChallenges contestId={contestId} {...props} />}
              />
              <Route
                exact
                path={`${url}/signups`}
                render={(props) => <ContestChallenges contestId={contestId} {...props} />}
              />
              <Route
                exact
                path={`${url}/statistics`}
                render={(props) => <ContestChallenges contestId={contestId} {...props} />}
              />
              <Route
                exact
                path={`${url}/:contestId/`}
                render={(props) => (
                  <div>
                    <h1>Editing Contest</h1>
                  </div>
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
