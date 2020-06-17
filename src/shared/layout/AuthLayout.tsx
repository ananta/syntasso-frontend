import React, { useEffect } from 'react';
import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
// import Container from 'components/Layout/Container';
import { useSelector, RootStateOrAny } from 'react-redux';
import routes from 'routes';

import { RouteComponentProps, RouteProps } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const AuthLayout: React.FC<Props & RouteComponentProps> = (props) => {
    const { children } = props;
    const Auth = useSelector((state: RootStateOrAny) => state.Auth);
    useEffect(() => {
        if (!Auth.isLoggedIn) {
            props.history.push(routes.home);
        }
    }, []);
    return (
        <AppContainer>
            <Navbar />

            <div>
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {/* <!-- Replace with your content --> */}
                        <div className="px-4 py-6 sm:px-0">
                            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">{children}</div>
                        </div>
                        {/* <!-- /End replace --> */}
                    </div>
                </main>
            </div>
        </AppContainer>
    );
};

export default AuthLayout;
