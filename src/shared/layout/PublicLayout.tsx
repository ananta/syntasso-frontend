import React, { useEffect } from 'react';
import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
import { SwipableDrawerComponent } from 'components/Layout/Drawer';
import Container from 'components/Layout/Container';
import HomeHeader from 'components/Layout/Header/HomeHeader';
import { History } from 'history';
import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const PublicLayout: React.FC<Props & RouteComponentProps> = (props) => {
    const { children } = props;

    useEffect(() => {
        console.log('Component did mount');

        // if (!localStorage.getItem("token")) {
        //     // User is not logged in. Redirect back to login
        //     this.props.history.push(routes.login);
        //     message.warning("Please login first");
        //     return;
        //   }
        // check for the token
        // if token available
        // navigate to the dashboard
        // else warn
    }, []);

    return (
        <AppContainer>
            <div style={{ flex: 1 }}>
                <HomeHeader />
            </div>
            {/* <Navbar />
            <SwipableDrawerComponent /> */}
            {/* <Container>{children}</Container> */}
        </AppContainer>
    );
};

export default PublicLayout;
