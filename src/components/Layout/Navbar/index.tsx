import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from 'shared/assets/images/logo-white.png';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import authAction from 'actions/AuthActions';
import { Auth } from 'actions/ActionTypes';

interface NavButtonProps {
  to: string;
  title: string;
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, title, className }) => (
  <NavLink
    activeClassName={'bg-gray-900'}
    to={to}
    className={
      'ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 ' +
      +className
    }
  >
    {title}
  </NavLink>
);

const MobileNavButton: React.FC<NavButtonProps> = ({ to, title, className }) => (
  <NavLink
    activeClassName={'bg-gray-900'}
    to={to}
    className={
      'mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 ' +
      +className
    }
  >
    {title}
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const {
    data: { isLoggedIn },
  } = useSelector((state: RootStateOrAny) => state['Auth']);
  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-8" src={Logo} alt="Syntasso logo" />
            </Link>
            <div className="hidden md:block">
              {!isLoggedIn ? (
                <div className="ml-10 flex items-baseline">
                  <NavButton title="Features" to="/features" className="ml-0" />
                  <NavButton title="Pricing" to="/pricing" />
                  <NavButton title="About" to="/about" />
                </div>
              ) : (
                <div className="ml-10 flex items-baseline">
                  <NavButton title="Dashboard" to="/dashboard" className="ml-0" />
                  <NavButton title="Challenges" to="/challenges" />
                  <NavButton title="Compete" to="/contests" />
                  <NavButton title="Jobs" to="/jobs" />
                  <NavButton title="Leaderboard" to="/leaderboard" />
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isLoggedIn && (
                <button
                  className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                  aria-label="Notifications"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              )}
              <div className="ml-3 relative">
                <div>
                  {isLoggedIn ? (
                    <button
                      onClick={() => setIsProfileDropdownVisible(!isProfileDropdownVisible)}
                      className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:z-10 "
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                    >
                      <img
                        className="h-8 w-8 rounded-full z-20"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  ) : (
                    <NavButton to="/login" title="Login" />
                  )}
                </div>
                {isProfileDropdownVisible && (
                  <>
                    {/* <button
                                            onClick={() => setIsProfileDropdownVisible(false)}
                                            className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 h-full w-full cursor-default"
                                        ></button> */}
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white">
                      <div
                        className="py-1 rounded-md bg-white shadow-xs"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          Your Profile
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          Settings
                        </a>
                        <button
                          onClick={() => dispatch(authAction(Auth.Logout, {}))}
                          className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className={'block h-6 w-6 ' + (isOpen ? 'hidden' : 'block')}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={'block h-6 w-6 ' + (isOpen ? 'block' : 'hidden')}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={(isOpen ? 'block' : 'hidden') + ' md:hidden block'}>
        {!isLoggedIn ? (
          <div className="px-2 pt-2 pb-3 sm:px-3">
            <MobileNavButton to="/features" title="Features" className="mt-0" />
            <MobileNavButton to="/pricing" title="Pricing" />
            <MobileNavButton to="/about" title="About" />
          </div>
        ) : (
          <div className="px-2 pt-2 pb-3 sm:px-3">
            <MobileNavButton title="Dashboard" to="/dashboard" className="ml-0" />
            <MobileNavButton title="Compete" to="/contests" />
            <MobileNavButton title="Certifications" to="/certifications" />
            <MobileNavButton title="Jobs" to="/jobs" />
            <MobileNavButton title="Leaderboard" to="/leaderboard" />
          </div>
        )}

        <div className="pt-4 pb-3 border-t border-gray-700">
          {isLoggedIn ? (
            <>
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                  <div className="mt-1 text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  Sign out
                </a>
              </div>
            </>
          ) : (
            <div className="px-2 pt-2 pb-3 sm:px-3">
              <MobileNavButton to="/login" title="Login" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
