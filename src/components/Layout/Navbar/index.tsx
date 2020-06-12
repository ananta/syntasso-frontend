import React, { useState } from 'react';

import Dropdown from './Dropdown';

import Logo from 'shared/assets/images/logo-white.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <header className="bg-primary sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
            <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                <div>
                    <div className=" flex items-center inline-block">
                        <span>
                            <img src={Logo} alt="Syntasso Logo" className="h-12" />
                        </span>
                        <h1 className="text-white ml-1 text-xl">Syntasso.io</h1>
                    </div>
                    <h1 className="text-pink-600 text-2sm">Ace the coding interviews</h1>
                </div>
                <div className="sm:hidden">
                    <button
                        type="button"
                        className="text-white focus:outline-none block"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {!isOpen ? (
                            <GiHamburgerMenu className="h-6 w-6 fill-current text-white-900 " />
                        ) : (
                            <MdClose className="h-6 w-6 fill-current text-white-900" />
                        )}
                    </button>
                </div>
            </div>
            <nav className={isOpen ? 'block' : 'hidden ' + 'sm:block'}>
                <div className={' px-2 pt-2 pb-4 sm:flex sm:items-center'}>
                    <a className="block text-white font-semibold rounded hover:bg-primary-lighter px-2 py-1" href="#">
                        What is Syntasso.io
                    </a>
                    <a
                        className="mt-1 block text-white font-semibold rounded hover:bg-primary-lighter px-2 py-1 sm:mt-0 sm:ml-2"
                        href="#"
                    >
                        {' '}
                        Content
                    </a>
                    <a
                        className="mt-1 block text-white font-semibold rounded hover:bg-primary-lighter px-2 py-1 sm:mt-0 sm:ml-2"
                        href="#"
                    >
                        Meet the Team
                    </a>
                    <a
                        className="mt-1 block text-white font-semibold rounded hover:bg-primary-lighter mb-1 px-2 py-1 sm:mt-0 sm:ml-2"
                        href="#"
                    >
                        Purchase
                    </a>
                    <Dropdown />
                    <div className="px-2 py-4 relative border-t border-gray-800 sm:hidden">
                        <div className="flex items-center">
                            <img
                                className="h-10 w-10  border-2 border-white-400 rounded-full  object-cover"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&h=1650"
                            />
                            <span className="text-white font-semibold ml-3">K.P. Oli</span>
                        </div>
                        <div className="mt-4">
                            <div className="">
                                <a className=" block text-gray-400 hover:text-white" href="#">
                                    Account Settings
                                </a>
                                <a className="block text-gray-400 mt-2 hover:text-white" href="#">
                                    Support
                                </a>
                                <a className="block text-gray-400 mt-2 hover:text-white" href="#">
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
