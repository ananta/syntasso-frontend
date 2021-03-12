import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import './styles/app.css';
import './App.css';
import { persistor } from 'store';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import 'typeface-roboto';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { history } from 'utils/History';
// Layouts and Routes
import PublicLayout from 'shared/layout/PublicLayout';
import AuthLayout from 'shared/layout/AuthLayout';
import CommonLayout from 'shared/layout/CommonLayout';
// Public Pages
import Dashboard from 'pages/Authenticated/Dashboard';
import { Contest, Contests } from 'pages/Authenticated/Contest/';
import Jobs from 'pages/Authenticated/Jobs';
import Challenge from 'pages/Authenticated/Challenge';

import Certifications from 'pages/Authenticated/Certifications';
import Administration from 'pages/Authenticated/Administration';
// import CreateContest from 'pa'
import About from 'pages/Public/About';
import Features from 'pages/Public/Features';
import Pricing from 'pages/Public/Pricing';
import Home from 'pages/Public/Home';
import Login from 'pages/Public/Login';
import JoinContest from 'pages/Common/JoinContest';
import Challenges from 'pages/Authenticated/Challenge/challenges';

// Authenticated Pages

export const pages = [
  // Public pages
  {
    title: 'Syntasso.io',
    exact: true,
    path: Routes.home,
    component: Home,
    layout: PublicLayout,
  },
  {
    title: 'Features',
    exact: true,
    path: Routes.features,
    component: Features,
    layout: PublicLayout,
  },
  {
    pricing: 'Pricing',
    exact: true,
    path: Routes.pricing,
    component: Pricing,
    layout: PublicLayout,
  },
  {
    title: 'About',
    exact: true,
    path: Routes.about,
    component: About,
    layout: PublicLayout,
  },
  {
    title: 'Login',
    exact: true,
    path: Routes.login,
    component: Login,
    layout: PublicLayout,
  },
  // Authenticated pages
  {
    title: 'Dashboard',
    exact: false,
    path: Routes.dashboard,
    component: Dashboard,
    layout: AuthLayout,
  },
  {
    title: 'Challenge',
    exact: false,
    path: Routes.challenge,
    component: Challenge,
    layout: AuthLayout,
  },
  {
    title: 'Join Contest',
    exact: true,
    path: Routes.joinContest,
    component: JoinContest,
    layout: CommonLayout,
  },
  {
    title: 'Contests',
    exact: false,
    path: Routes.contests,
    component: Contests,
    layout: AuthLayout,
  },
  {
    title: 'Challenges',
    exact: false,
    path: Routes.challenges,
    component: Challenges,
    layout: AuthLayout,
  },
  {
    title: 'Challenge',
    exact: false,
    path: Routes.contestChallenge,
    component: Challenge,
    layout: AuthLayout,
  },
  {
    title: 'Contest',
    exact: false,
    path: Routes.contest,
    component: Contest,
    layout: AuthLayout,
  },
  {
    title: 'Certifications',
    exact: false,
    path: Routes.certifications,
    component: Certifications,
    layout: AuthLayout,
  },
  {
    title: 'Jobs',
    exact: false,
    path: Routes.jobs,
    component: Jobs,
    layout: AuthLayout,
  },
  {
    title: 'Administration',
    exact: false,
    path: Routes.administration,
    component: Administration,
    layout: AuthLayout,
  },
];

const App: React.FC = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <Switch>
          {pages.map(({ exact, path, component: Component, layout: Layout, title }, index) => (
            <Route
              key={index}
              exact={exact}
              path={path}
              render={(props) => (
                <Layout history={props.history} match={props.match} title={title} location={props.location}>
                  <Component {...props} />
                </Layout>
              )}
            />
          ))}
          <Redirect to={Routes.dashboard} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </PersistGate>
  );
};

export default App;
