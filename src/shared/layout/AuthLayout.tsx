import React, { useEffect } from 'react';
import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
// import Container from 'components/Layout/Container';
import { useSelector, RootStateOrAny } from 'react-redux';
import routes from 'routes';

import { RouteComponentProps } from 'react-router-dom';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/PageHeader';
import { toast } from 'react-toastify';

interface Props {
    children: React.ReactNode;
    title: string;
}

const AuthLayout: React.FC<Props & RouteComponentProps> = (props) => {
    const { children } = props;
    const Auth = useSelector((state: RootStateOrAny) => state.Auth);
    useEffect(() => {
        toast.error('Please Loging to continue');
        if (!Auth.data.isLoggedIn) {
            props.history.push(routes.home);
        }
    }, [Auth]);
    useEffect(() => {
        if (!Auth.data.isLoggedIn) {
            props.history.push(routes.home);
        }
    }, []);
    return (
        <AppContainer>
            <Navbar />
            <div>
                <Header title={props.title} subTitle="Home" />
                <main>
                    <div className="bg-gray-200">
                        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                            <div>{children}</div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </AppContainer>
    );
};

export default AuthLayout;
