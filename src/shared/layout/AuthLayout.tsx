import React, { useEffect } from "react";
import AppContainer from "components/Layout/AppContainer";
import Navbar from "components/Layout/Navbar";
import {
  DrawerComponent,
  SwipableDrawerComponent,
} from "components/Layout/Drawer";
import Container from "components/Layout/Container";

import routes from "../routes/RouterWithProps";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = (props) => {
  const { children } = props;

  useEffect(() => {
    console.log("Component did mount");

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

  const handleLogout = () => {
    // clear the local storage
    // push the user to the authentication panel
  };

  return (
    <AppContainer>
      <Navbar />
      <SwipableDrawerComponent />
      <Container>{children}</Container>
    </AppContainer>
  );
};

export default AuthLayout;
