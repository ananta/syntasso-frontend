import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, RouteComponentProps, useParams, useRouteMatch, NavLink, Redirect } from 'react-router-dom';

import { MediumTitle } from 'components/Common/CustomText';
import Contest from './Contest';
import Challenges from './Challenges';

const Administration: React.FC<RouteComponentProps> = (RouteProps) => {
    // console.log(RouteProps);
    const {
        location: { pathname },
    } = RouteProps;
    const { url } = useRouteMatch();
    // Redirect to /contests if /administration is accessed! That's a dumb route just for mapping to parent route
    if (pathname === '/administration/' || pathname === '/administration') {
        return <Redirect to="/administration/contests" />;
    }
    return (
        <div className="bg-white">
            <ul className="flex border-b bg-gray-200">
                <NavLink
                    activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
                    activeClassName={
                        'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'
                    }
                    to={`${url}/contests`}
                    className="bg-gray-200  inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
                >
                    <li className="-mb-px mr-1">Manage Contests</li>
                </NavLink>
                <NavLink
                    activeStyle={{ backgroundColor: 'white', marginBottom: -1 }}
                    activeClassName={
                        'inline-block border-l border-t border-r rounded-t py-2 px-4 text-gray-700 font-semibold'
                    }
                    to={`${url}/challenges`}
                    className="bg-gray-200 inline-block py-2 px-4 text-blue-500 hover:text-gray-800 font-semibold"
                >
                    <li className="mr-1">Manage Challenges</li>
                </NavLink>
            </ul>
            <div className="bg-white py-6 px-4 border-l border-b border-r">
                <Switch>
                    <Route path={`${url}/contests`} render={(props) => <Contest {...props} />} />
                    <Route path={`${url}/challenges`} render={(props) => <Challenges {...props} />} />
                    <Route component={() => <div>NOT FOUND</div>} />
                </Switch>
            </div>
        </div>
    );
};

export default Administration;
