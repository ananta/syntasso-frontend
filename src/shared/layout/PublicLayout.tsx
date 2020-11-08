import React, { useEffect, useState } from 'react';
import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import routes from 'routes';
import Footer from 'components/Layout/Footer';

interface Props {
  children: React.ReactNode;
  title: string;
}

const PublicLayout: React.FC<Props & RouteComponentProps> = (props) => {
  const { children } = props;
  const Auth = useSelector((state: RootStateOrAny) => state.Auth);

  useEffect(() => {
    if (Auth.data.isLoggedIn) {
      props.history.push(routes.dashboard);
    }
  }, [Auth]);

  return (
    <AppContainer>
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </AppContainer>
  );
};

export default PublicLayout;
