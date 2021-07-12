import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import { history } from 'utils/History';
import authAction from 'actions/AuthActions';
import { Auth } from 'actions/ActionTypes';

import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronRight from '@material-ui/icons/ChevronRight';

import Logo from 'shared/assets/images/default.png';
import { ReactComponent as CaretIcon } from 'shared/assets/icons/caret.svg';
import { ReactComponent as LogoutIcon } from 'shared/assets/icons/logout.svg';
import { ReactComponent as CogIcon } from 'shared/assets/icons/cog.svg';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow.svg';
import { ReactComponent as BoltIcon } from 'shared/assets/icons/bolt.svg';

interface NavButtonProps {
  to: string;
  title: string;
  className?: string;
}

export const NavBarElements = [
  {
    title: 'Features',
    location: '/features',
    isProtected: false,
    extraClass: 'ml-0',
  },
  {
    title: 'Pricing',
    location: '/pricing',
    isProtected: false,
  },
  {
    title: 'About',
    location: '/about',
    isProtected: false,
  },
  {
    title: 'Dashboard',
    location: '/dashboard',
    isProtected: true,
    extraClass: 'ml-0',
  },
  {
    title: 'Challenges',
    location: '/challenges',
    isProtected: true,
  },
  {
    title: 'Compete',
    location: '/contests',
    isProtected: true,
  },
  {
    title: 'Bookmarks',
    location: '/bookmarks',
    isProtected: true,
  },
];

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

function NavContainer(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem({ open, setOpen, ...props }) {
  const { icon, children, ...rem } = props;
  return (
    <li className="nav-item">
      <p
        className="icon-button focus:outline-none"
        tabIndex={0}
        {...rem}
        onClick={() => {
          console.log('Setting the menu');
          setOpen(!open);
        }}
      >
        {icon}
      </p>
      {open && children}
    </li>
  );
}

interface IDropdownMenu {
  isMobile?: boolean;
}

const DropdownMenu = forwardRef<HTMLDivElement, IDropdownMenu>(({ isMobile }, ref) => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const {
    data: {
      user: { username },
    },
  } = useSelector((state: RootStateOrAny) => state['Auth']);
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 20);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 20);
  }

  function DropdownItem(props) {
    return (
      <p className="menu-item text-gray-200" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)} {...props}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </p>
    );
  }

  return (
    <div
      ref={ref}
      className={classnames(isMobile ? 'dropdown-mobile' : 'dropdown')}
      style={{ height: !isMobile && menuHeight }}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            onClick={() => history.push(`/profile/${username}`)}
            leftIcon={<AccountCircle fontSize="large" />}
          >
            @{username}
          </DropdownItem>
          <DropdownItem leftIcon={<CogIcon />} rightIcon={<ChevronRight />} goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem onClick={() => dispatch(authAction(Auth.Logout, {}))} leftIcon={<LogoutIcon />}>
            Signout
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Back</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Option 1</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Option 2</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Option 3</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Option 4</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
});

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = (e: any) => {
    if (
      !(
        (dropdownRef.current && dropdownRef.current.contains(e.target)) ||
        e.target.tagName === 'P' ||
        e.target.tagName === 'svg' ||
        e.target.tagName === 'path'
      )
    )
      setOpen(false);
  };

  const {
    data: { isLoggedIn },
  } = useSelector((state: RootStateOrAny) => state['Auth']);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener('mousedown', handleDropdownClick);
    return () => {
      document.removeEventListener('mousedown', handleDropdownClick);
    };
  }, []);

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
                  {NavBarElements.filter((item) => !item.isProtected).map((item) => (
                    <NavButton title={item.title} to={item.location} className={item.extraClass} />
                  ))}
                </div>
              ) : (
                <div className="ml-10 flex items-baseline">
                  {NavBarElements.filter((item) => item.isProtected).map((item) => (
                    <NavButton title={item.title} to={item.location} className={item.extraClass} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div>
                  {isLoggedIn ? (
                    <NavContainer>
                      <NavItem id="caret" open={open} setOpen={setOpen} icon={<CaretIcon id="caret" />}>
                        <DropdownMenu ref={dropdownRef}></DropdownMenu>
                      </NavItem>
                    </NavContainer>
                  ) : (
                    <NavButton to="/login" title="Login" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              onClick={() => setOpen(!open)}
            >
              <svg
                className={'block h-6 w-6 ' + (open ? 'hidden' : 'block')}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={'block h-6 w-6 ' + (open ? 'block' : 'hidden')}
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
      <div className={(open ? 'block' : 'hidden') + ' md:hidden block'}>
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
          </div>
        )}
        <DropdownMenu isMobile />
      </div>
    </nav>
  );
};

export default Navbar;
