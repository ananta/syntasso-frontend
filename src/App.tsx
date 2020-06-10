import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { useRecoilState } from 'recoil';
import './styles/app.css';
import { persistor } from 'store';

// import MainTheme from "./theme";
import 'typeface-roboto';

import { ThemeProvider } from '@material-ui/core';
import { getThemeByName } from 'themes/base';
import AuthLayout from 'shared/layout/AuthLayout';
import Home from 'pages/Home';
import ThemeState from 'atoms/Theme';

import './App.css';

const App: React.FC = () => {
    const [themeState] = useRecoilState(ThemeState);

    // console.log(themeState);

    return (
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={getThemeByName(themeState.light ? 'lightTheme' : 'darkTheme')}>
                <AuthLayout>
                    <Home />
                </AuthLayout>
            </ThemeProvider>
        </PersistGate>
    );
};

export default App;
