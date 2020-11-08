import React from 'react';
import { Route, Switch, RouteComponentProps, useRouteMatch } from 'react-router-dom';

import CreateChallenges from './Create';
import ManageChallenges from './Manage';
import EditChallenges from './Edit';

const Challenges: React.FC<RouteComponentProps> = (RouteProps) => {
  const { url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${url}/create`} render={(props) => <CreateChallenges {...props} />} />
        <Route path={`${url}/edit/:challengeId`} render={(props) => <EditChallenges {...props} />} />
        <Route render={(props) => <ManageChallenges {...props} />} />
      </Switch>
    </div>
  );
};

export default Challenges;
