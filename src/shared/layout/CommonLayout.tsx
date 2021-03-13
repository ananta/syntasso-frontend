import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';

interface Props {
  children: React.ReactNode;
  title: string;
}

const CommonLayout: React.FC<Props & RouteComponentProps> = (props) => {
  const { children } = props;
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

export default CommonLayout;
