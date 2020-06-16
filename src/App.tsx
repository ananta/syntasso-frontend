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
import Dashboard from 'pages/Authenticated/Dashboard';
import About from 'pages/Public/About';
import Features from 'pages/Public/Features';
import Pricing from 'pages/Public/Pricing';
import Home from 'pages/Public/Home';

// Authenticated Pages

const pages = [
    // Public pages
    {
        exact: true,
        path: Routes.home,
        component: Home,
        layout: PublicLayout,
    },
    {
        exact: true,
        path: Routes.features,
        component: Features,
        layout: PublicLayout,
    },
    {
        exact: true,
        path: Routes.pricing,
        component: Pricing,
        layout: PublicLayout,
    },
    {
        exact: true,
        path: Routes.about,
        component: About,
        layout: PublicLayout,
    },
    // Authenticated pages
    {
        exact: false,
        path: Routes.dashboard,
        component: Dashboard,
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
