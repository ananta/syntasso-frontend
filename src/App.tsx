import React from "react";
import { RecoilRoot } from "recoil";
import MainTheme from "./theme";
import "typeface-roboto";

import { ThemeProvider } from "@material-ui/core";
import AuthLayout from "shared/layout/AuthLayout";
import Home from "pages/Home";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <RecoilRoot>
        <ThemeProvider theme={MainTheme}>
          <AuthLayout>
            <Home />
          </AuthLayout>
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
};

export default App;
