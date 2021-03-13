import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import NotFound from 'components/Common/NotFound';

interface RouteWithProps extends RouteComponentProps {
  challengeId: string;
}

const Settings: React.FC<RouteWithProps> = (RouteProps) => {
  return <NotFound />;
};

export default Settings;
