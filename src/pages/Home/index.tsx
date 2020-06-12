import React, { useState, useEffect, useRef } from 'react';
import IDE from 'components/IDE';
import { RouteComponentProps } from 'react-router-dom';
import CardComponent from 'components/Common/CardComponent';
import Dropdown from 'components/Layout/Navbar/Dropdown';

const Home: React.FC<RouteComponentProps> = () => {
    return (
        <div>
            {/* <div className="bg-gray-200 min-h-screen p-8 flex items-center justify-center"> */}
            {/* <CardComponent /> */}
            {/* </div> */}
            {/* <Dropdown /> */}
            {/* <div style={{ height: 100, marginLeft: 40 }}>
                <h1>Test Environment</h1>
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ width: '90%' }}>
                    <IDE height={20} />
                    <p className="text-red-300">Hello</p>
                </div>
            </div> */}
        </div>
    );
};

export default Home;
