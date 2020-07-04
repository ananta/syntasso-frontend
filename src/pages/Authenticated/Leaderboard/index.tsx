import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';

const Leaderboard: React.FC<RouteComponentProps> = () => {
    return (
        <div>
            <div>
                <MediumTitle>Leaderboard</MediumTitle>
            </div>
        </div>
    );
};

export default Leaderboard;
