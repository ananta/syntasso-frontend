import React from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router-dom';

import NotFound from 'components/Common/NotFound';

interface RouteWithProps extends RouteComponentProps {
  challengeId: string;
}

const Languages: React.FC<RouteWithProps> = (RouteProps) => {
  const { url } = useRouteMatch();
  return (
    <div>
      <NotFound />
    </div>
  );
};

export default Languages;
