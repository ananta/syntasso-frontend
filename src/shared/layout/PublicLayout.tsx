import React, { useEffect, useState, Children } from 'react';
import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
import Logo from 'shared/assets/images/logo-white.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import routes from 'routes';
import CodeReview from 'shared/assets/svg/code_review.svg';
import Footer from 'components/Layout/Footer';

interface Props {
    children: React.ReactNode;
}

const PublicLayout: React.FC<Props & RouteComponentProps> = (props) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { children } = props;
    const Auth = useSelector((state: RootStateOrAny) => state.Auth);

    useEffect(() => {
        console.log('Component did mount');
        if (Auth.data.isLoggedIn) {
            props.history.push(routes.dashboard);
        }
    }, [Auth]);

    return (
        <AppContainer>
            <Navbar />
            <div>
                <main>{children}</main>
            </div>
            <Footer />
        </AppContainer>
    );
};

export default PublicLayout;
