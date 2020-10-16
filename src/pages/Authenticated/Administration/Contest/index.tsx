import React from 'react';
import { Route, Switch, RouteComponentProps, useRouteMatch } from 'react-router-dom';
import EditContest from './Edit';

import CreateContest from './Create';
import ManageContest from './Manage';

const Contests: React.FC<RouteComponentProps> = (RouteProps) => {
  const { url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${url}/create`} render={(props) => <CreateContest {...props} />} />
        <Route path={`${url}/edit/:contestId`} render={(props) => <EditContest {...props} />} />
        <Route exact path={`${url}/`} render={(props) => <ManageContest {...props} />} />
      </Switch>
    </div>
  );
};

export default Contests;
