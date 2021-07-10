import React from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { NavBarElements } from 'components/Layout/Navbar';

interface PageHeaderProps {
  subTitle: string;
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle }) => {
  const location = useLocation();
  const history = useHistory();
  const breadcrumbs = useBreadcrumbs();
  breadcrumbs.shift();
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-row items-center my-4 mr-4">
          {NavBarElements.filter((item) => item.location === location.pathname).length <= 0 && (
            <ArrowBackIosIcon
              onClick={() => history.goBack()}
              style={{ color: '#gray', fontSize: 20 }}
              className="cursor-pointer"
            />
          )}
          <h1 className="text-3xl font-bold leading-tight text-gray-900 ">{title}</h1>
        </div>
        <header>
          <div className="max-w-7xl mx-auto ">
            <div className="border-t border-gray-200 py-3">
              <nav className="flex" aria-label="Breadcrumb">
                <div className="hidden sm:block">
                  <ol className="flex items-center space-x-4">
                    <li>
                      <div>
                        <a href="/" className="text-gray-400 hover:text-gray-500">
                          <svg
                            className="flex-shrink-0 h-5 w-5"
                            data-todo-x-description="Heroicon name: solid/home"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                          </svg>
                          <span className="sr-only">Home</span>
                        </a>
                      </div>
                    </li>
                    {breadcrumbs.map(({ match, breadcrumb }) => (
                      <li>
                        <div className="flex items-center">
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                          </svg>
                          <NavLink
                            to={match.url}
                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                          >
                            {breadcrumb}
                          </NavLink>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>
    </header>
  );
};

export default PageHeader;
