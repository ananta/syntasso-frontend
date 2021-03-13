import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MediumTitle } from 'components/Common/CustomText';

interface RouteWithProps extends RouteComponentProps {
  challengeId: string;
}

const Moderaotrs: React.FC<RouteWithProps> = (RouteProps) => {
  return (
    <div>
      <div>
        <MediumTitle>Moderaotrs</MediumTitle>
      </div>
    </div>
  );
};

export default Moderaotrs;
