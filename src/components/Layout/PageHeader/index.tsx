import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { NavBarElements } from 'components/Layout/Navbar';

interface PageHeaderProps {
  subTitle: string;
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center my-2">
            {NavBarElements.filter((item) => item.location === location.pathname).length <= 0 && (
              <ArrowBackIosIcon
                onClick={() => history.goBack()}
                style={{ color: '#gray', fontSize: 20 }}
                className="cursor-pointer"
              />
            )}
            <p className="text-md leading-tight text-gray-500">{subTitle}</p>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">{title}</h1>
        </div>
      </header>
    </div>
  );
};

export default PageHeader;
