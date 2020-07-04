import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle, RegularText } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import { history } from 'utils/History';
import NotFound from 'components/Common/NotFound';

interface RouteWithProps extends RouteComponentProps {
    challengeId: string;
}

const CodeStubs: React.FC<RouteWithProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    return (
        <div>
            <NotFound />
        </div>
    );
};

export default CodeStubs;
