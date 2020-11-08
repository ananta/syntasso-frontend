import React from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { MediumTitle } from 'components/Common/CustomText';

interface RouteWithProps extends RouteComponentProps {
  challengeId: string;
}

const Moderaotrs: React.FC<RouteWithProps> = (RouteProps) => {
  const { url } = useRouteMatch();
  return (
    <div>
      <div>
        <MediumTitle>Moderaotrs</MediumTitle>
      </div>
    </div>
  );
};

export default Moderaotrs;
