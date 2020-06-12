import React, { useState, useCallback, useEffect } from 'react';
import useKeyPress from 'hooks/useKeyPress';

import { FaUserGraduate } from 'react-icons/fa';

interface DropdownProps {
    className?: string;
}
const Dropdown: React.FC<DropdownProps> = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const escPressed = useKeyPress('Escape');
    useEffect(() => {
        if (escPressed) {
            setIsDropdownOpen(false);
        }
    }, [escPressed]);
    return (
        <div className="relative hidden  inline-block ml-6 sm:block">
            <button
                tabIndex={-1}
                className="relative h-10 w-10 rounded-full block overflow-hidden border-2 border-white-400 focus:outline-none focus:border-white-900 z-10"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <img
                    className="h-fill w-fill  object-cover"
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&h=1650"
                />
            </button>
            {isDropdownOpen && (
                <div>
                    <button
                        onClick={() => setIsDropdownOpen(false)}
                        className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 h-full w-full cursor-default"
                    ></button>
                    <div className="bg-white rounded-lg py-2 w-56 mt-2 shadow-xl absolute right-0">
                        <a className="block px-4 py-2 text hover:bg-primary hover:text-white" href="#">
                            Account Settings
                        </a>
                        <a className="block px-4 py-2 text hover:bg-primary hover:text-white" href="#">
                            Support
                        </a>
                        <a className="block px-4 py-2 text hover:bg-primary hover:text-white" href="#">
                            Sign out
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
