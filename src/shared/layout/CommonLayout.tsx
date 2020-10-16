import React, { useEffect, useState, Children } from 'react';
import AppContainer from 'components/Layout/AppContainer';
import Navbar from 'components/Layout/Navbar';
import Logo from 'shared/assets/images/logo-white.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';
import routes from 'routes';
import Footer from 'components/Layout/Footer';

interface Props {
    children: React.ReactNode;
    title: string;
}

const CommonLayout: React.FC<Props & RouteComponentProps> = (props) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { children } = props;
    const Auth = useSelector((state: RootStateOrAny) => state.Auth);

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

export default CommonLayout;
