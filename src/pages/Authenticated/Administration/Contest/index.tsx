import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, RouteComponentProps, useParams, useRouteMatch, NavLink, Redirect } from 'react-router-dom';

import CreateContest from './Create';
import ManageContest from './Manage';

const Contests: React.FC<RouteComponentProps> = (RouteProps) => {
    const { url } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={`${url}/create`} render={(props) => <CreateContest {...props} />} />
                <Route exact path={`${url}/`} render={(props) => <ManageContest {...props} />} />
            </Switch>
        </div>
    );
};

export default Contests;
