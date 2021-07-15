import { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import routes from 'routes';

export type LayoutType = 'common' | 'public' | 'authenticated';

const useLoadingAuthenticator = (currentLayout: LayoutType) => {
  const [isLayoutLoading, setIsLayoutLoading] = useState(true);
  const history = useHistory();
  const Auth = useSelector((state: RootStateOrAny) => state.Auth);

  const handleLayoutCheck = () => {
    console.log('Checking for the logged in data');
    if (Auth.data.isLoggedIn) {
      if (currentLayout === 'public') history.push(routes.dashboard);
    } else {
      if (currentLayout === 'authenticated') history.push(routes.home);
    }
    setIsLayoutLoading(false);
  };
  useEffect(() => {
    handleLayoutCheck();
  }, [Auth]);

  useEffect(() => {
    handleLayoutCheck();
  }, []);

  return [isLayoutLoading];
};

export default useLoadingAuthenticator;
