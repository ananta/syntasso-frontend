import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import NotFound from 'components/Common/NotFound';

import Button from 'components/Common/Button';
import { history } from 'utils/History';

interface RouteWithProps extends RouteComponentProps {
    challengeId: string;
}

const Languages: React.FC<RouteWithProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    return (
        <div>
            <NotFound />
        </div>
    );
};

export default Languages;
