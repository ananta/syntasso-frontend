import React, { useState, useEffect, useRef } from 'react';
import IDE from 'components/IDE';
import { RouteComponentProps } from 'react-router-dom';
import CardComponent from 'components/Common/CardComponent';

const Home: React.FC<RouteComponentProps> = () => {
    return (
        <div>
            <div
                className="my-20"
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ width: '90%' }}>
                    <IDE height={20} />
                </div>
            </div>
            <div className="bg-gray-200 min-h-screen p-8 flex items-center justify-center">
                <CardComponent />
            </div>
        </div>
    );
};

export default Home;
