import React from 'react';

const AppContainer: React.FC = (props) => {
    const { children } = props;
    return <div>{children}</div>;
};

export default AppContainer;
