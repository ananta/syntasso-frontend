import React, { useEffect, useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

import routes from 'routes';

import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/PageHeader';

interface Props {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<Props & RouteComponentProps> = (props) => {
  const { children } = props;
  const Auth = useSelector((state: RootStateOrAny) => state.Auth);
  const [isLoading, setIsLoading] = useState(true);
  const handleAuthentication = () => {
    if (!Auth.data.isLoggedIn) {
      props.history.push(routes.home);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleAuthentication();
  }, [Auth]);
  useEffect(() => {
    handleAuthentication();
  }, []);
  return (
    <AppContainer>
      <LoadingBar color="#2B6CB0" progress={isLoading ? 0 : 100} />
      <Navbar />
      <div>
        <Header title={props.title} subTitle="Home" />
        <main>
          <div className="bg-gray-200">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {/* {isLoading ? (
                <div className="inputs w-full p-6">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader type="Bars" color="#d53f8c" height={60} width={60} />
                  </div>
                </div>
              ) : ( */}
              <div>{children}</div>
              {/* )} */}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </AppContainer>
  );
};

export default AuthLayout;
