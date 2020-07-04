import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';
import HireBanner from './components/HireBanner';

const Jobs: React.FC<RouteComponentProps> = () => {
    return (
        <div>
            <div>
                <div style={{ marginBottom: 20 }}>
                    <HireBanner />
                </div>
            </div>
        </div>
    );
};

export default Jobs;
