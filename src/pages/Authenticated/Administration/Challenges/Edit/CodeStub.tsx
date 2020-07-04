import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps, Redirect, useRouteMatch } from 'react-router-dom';
import { MediumTitle, RegularText } from 'components/Common/CustomText';
import Button from 'components/Common/Button';
import { history } from 'utils/History';
import NotFound from 'components/Common/NotFound';

const CodeStubs: React.FC<RouteComponentProps> = (RouteProps) => {
    const { url } = useRouteMatch();
    return (
        <div>
            <NotFound />
        </div>
    );
};

export default CodeStubs;
