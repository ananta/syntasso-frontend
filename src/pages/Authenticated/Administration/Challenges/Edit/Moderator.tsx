import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import { history } from 'utils/History';

interface RouteWithProps extends RouteComponentProps {
    challengeId: string;
}

const Moderaotrs: React.FC<RouteWithProps> = (RouteProps) => {
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
