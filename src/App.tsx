import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { useRecoilState } from 'recoil';
import './styles/app.css';
import './App.css';
import { persistor } from 'store';
import ThemeState from 'atoms/Theme';
import { Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import MainTheme from "./theme";
import 'typeface-roboto';

import Routes from './routes';

// Layouts and Routes
import PublicLayout from 'shared/layout/PublicLayout';
import AuthLayout from 'shared/layout/AuthLayout';

import { ThemeProvider } from '@material-ui/core';
import { getThemeByName } from 'themes/base';

// Public Pages
import Home from 'pages/Home';

// Authenticated Pages

const pages = [
    // Public pages
    {
        exact: true,
        path: Routes.login,
        component: Home,
        layout: PublicLayout,
    },
    // Authenticated pages
    {
        exact: false,
        path: Routes.dashboard,
        component: Home,
        layout: AuthLayout,
    },
];

const App: React.FC = () => {
    const history = createBrowserHistory();

    const [themeState] = useRecoilState(ThemeState);

    // console.log(themeState);

    return (
        <PersistGate loading={null} persistor={persistor}>
            {/* <ThemeProvider theme={getThemeByName(themeState.light ? 'lightTheme' : 'darkTheme')}> */}
            <Router history={history}>
                <Switch>
                    {pages.map(({ exact, path, component: Component, layout: Layout }, index) => (
                        <Route
                            key={index}
                            exact={exact}
                            path={path}
                            render={(props) => (
                                <Layout history={props.history} match={props.match} location={props.location}>
                                    <Component {...props} />
                                </Layout>
                            )}
                        />
                    ))}
                    <Redirect to={Routes.dashboard} />
                    {/* Or Uncomment below to use a custom 404 page */}
                    {/* <Route component={NotFoundPage} /> */}
                </Switch>
            </Router>
            {/* <AuthLayout>
                <Home />
            </AuthLayout> */}
            {/* </ThemeProvider> */}
        </PersistGate>
    );
};

export default App;
