import React, { useState, useEffect, useRef } from 'react';
import IDE from 'components/IDE';

const Home = () => {
    return (
        <div>
            <div style={{ height: 100, marginLeft: 40 }}>
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
            </div>
        </div>
    );
};

export default Home;
