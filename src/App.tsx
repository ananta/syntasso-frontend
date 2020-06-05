import React from "react";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "store";

import MainTheme from "./theme";
import "typeface-roboto";

import { ThemeProvider } from "@material-ui/core";
import AuthLayout from "shared/layout/AuthLayout";
import Home from "pages/Home";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <RecoilRoot>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={MainTheme}>
              <AuthLayout>
                <Home />
              </AuthLayout>
            </ThemeProvider>
          </PersistGate>
        </RecoilRoot>
      </Provider>
    </div>
  );
};

export default App;
