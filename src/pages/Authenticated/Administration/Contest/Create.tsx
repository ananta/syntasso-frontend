import React, { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';

const Create: React.FC<RouteComponentProps> = () => {
    console.log('IMMa here');
    return (
        <div>
            <div>
                <MediumTitle>Create Contest</MediumTitle>
            </div>
        </div>
    );
};

export default Create;
