import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import NotFound from 'components/Common/NotFound';

import Button from 'components/Common/Button';
import { history } from 'utils/History';

const Languages: React.FC<RouteComponentProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    return (
        <div>
            <NotFound />
        </div>
    );
};

export default Languages;
