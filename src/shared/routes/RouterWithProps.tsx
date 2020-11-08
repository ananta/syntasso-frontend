import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface Props {
  exact?: boolean;
  path: string;
  extraProps: object;
  component: React.FC;
}
const RouteWithProps: React.FC<Props & RouteProps> = (props) => {
  const { exact, path, extraProps, component: Component } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        const allProps = { ...props, ...extraProps };
        return <Component {...allProps} />;
      }}
    />
  );
};

export default RouteWithProps;
