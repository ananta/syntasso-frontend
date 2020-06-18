import React from 'react';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import { PersistGate } from 'redux-persist/integration/react';
import './styles/app.css';
import './App.css';
import { persistor } from 'store';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import 'typeface-roboto';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Routes from './routes';
import CustomAlertTemplate from 'components/Common/AlertTemplate';

// Layouts and Routes
import PublicLayout from 'shared/layout/PublicLayout';
import AuthLayout from 'shared/layout/AuthLayout';

// Public Pages
import Dashboard from 'pages/Authenticated/Dashboard';
import About from 'pages/Public/About';
import Features from 'pages/Public/Features';
import Pricing from 'pages/Public/Pricing';
import Home from 'pages/Public/Home';
import Login from 'pages/Public/Login';

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
    {
        exact: true,
        path: Routes.login,
        component: Login,
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

const AlertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 4000,
    offset: '30px',
    transition: transitions.FADE,
    containerStyle: {
        width: '100%',
        zIndex: 1000,
        display: 'block',
        position: 'fixed',
        right: 0,
        justifyContent: 'center',
    },
};

const App: React.FC = () => {
    const history = createBrowserHistory();

    return (
        <AlertProvider template={CustomAlertTemplate} {...AlertOptions}>
            <PersistGate loading={null} persistor={persistor}>
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
                        {/* <Route component={NotFoundPage} /> */}
                    </Switch>
                </Router>
            </PersistGate>
        </AlertProvider>
    );
};

export default App;
