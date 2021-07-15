import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

import routes from 'routes';

import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';
import useLoadingAuthenticator from 'hooks/useLoadingAuthenticator';

interface Props {
  children: React.ReactNode;
  title: string;
}

const PublicLayout: React.FC<Props & RouteComponentProps> = (props) => {
  const [isLayoutLoading] = useLoadingAuthenticator('public');
  const { children } = props;

  if (isLayoutLoading) return <div />;
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
