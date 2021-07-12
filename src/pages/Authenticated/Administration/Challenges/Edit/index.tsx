import React, { useState, useEffect } from 'react';
import { Route, Switch, RouteComponentProps, useRouteMatch, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isUserAuthorizedToChallenge } from 'api';
import { history } from 'utils/History';

import CustomLoader from 'components/Common/CustomLoader';

import Details from './Details';
import Settings from './Settings';
import Editorial from './Editorial';
import Language from './Languages';
import Moderators from './Moderator';
import Testcase from './Testcase';
import CodeStubs from './CodeStub';

interface MatchParams {
  challengeId: string;
}

type EditChallengeParms = RouteComponentProps<MatchParams>;

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

const Challenges: React.FC<EditChallengeParms> = (RouteProps) => {
  const { url } = useRouteMatch();
  const [isLoading, setIsLoading] = useState(false);
  console.log(RouteProps);
  const {
    match: {
      params: { challengeId },
    },
    location: { pathname },
  } = RouteProps;
  console.log(url);
  const Auth = useSelector((state) => state['Auth']);
  const checkAuthorization = async () => {
    try {
      setIsLoading(true);
      const authRes = await isUserAuthorizedToChallenge({
        token: Auth.data.user.token,
        challengeId,
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
    // check if user has privelages to the given challenge or not
  }, []);
  if (isLoading) return <CustomLoader />;
  return (
    <div>
      <div className="bg-white ">
        <div className="mx-auto">
          <div className="inputs w-full max-w-6xl p-6">
            <h2 className="text-3xl text-gray-900">Edit Challenge</h2>
            <div className="my-5">
              <ul className="flex border-b">
                <TabItem title="Details" to={`${url}/details`} />
                <TabItem title="Test Case" to={`${url}/testcase`} />
                {/* <TabItem title="Editorial" to={`${url}/editorial`} />
                <TabItem title="Language" to={`${url}/language`} />
                <TabItem title="Code Stub" to={`${url}/codestub`} /> */}
                <TabItem title="Settings" to={`${url}/settings`} />
              </ul>
            </div>
            <Switch>
              <Route
                exact
                path={`${url}/details`}
                render={(props) => <Details challengeId={challengeId} {...props} />}
              />
              <Route
                exact
                path={`${url}/codestub`}
                render={(props) => <CodeStubs challengeId={challengeId} {...props} />}
              />
              <Route
                exact
                path={`${url}/editorial`}
                render={(props) => <Editorial challengeId={challengeId} {...props} />}
              />
              <Route
                exact
                path={`${url}/testcase`}
                render={(props) => <Testcase challengeId={challengeId} {...props} />}
              />
              <Route
                exact
                path={`${url}/language`}
                render={(props) => <Language challengeId={challengeId} {...props} />}
              />
              <Route
                exact
                path={`${url}/moderator`}
                render={(props) => <Moderators challengeId={challengeId} {...props} />}
              />
              <Route
                exact
                path={`${url}/settings`}
                render={(props) => <Settings challengeId={challengeId} {...props} />}
              />
              <Route
                exact
                path={`${url}/:challengeId/`}
                render={(props) => (
                  <div>
                    <h1>Editing Challenges</h1>
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
