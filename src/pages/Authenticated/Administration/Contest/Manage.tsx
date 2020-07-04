import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import { history } from 'utils/History';

const Manage: React.FC<RouteComponentProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    return (
        <div>
            <div>
                <MediumTitle>Manage Contest</MediumTitle>
            </div>
            <Button title="Create Contest" onClick={() => history.push(url + '/create')} />
        </div>
    );
};

export default Manage;
