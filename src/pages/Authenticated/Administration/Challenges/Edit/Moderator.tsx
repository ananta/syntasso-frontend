import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import { history } from 'utils/History';

const Moderaotrs: React.FC<RouteComponentProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    return (
        <div>
            <div>
                <MediumTitle>Moderaotrs</MediumTitle>
            </div>
        </div>
    );
};

export default Moderaotrs;
