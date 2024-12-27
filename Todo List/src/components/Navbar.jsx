import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-teal-400 to-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="logo ">
                    <a className="flex gap-2" href="#">
                        <div><img className='w-8 h-8' src="/list.png" alt="" /></div>
                        <div className="text-white text-2xl font-extrabold">
                            To-do List
                        </div>
                    </a>
                </div>


                {/* Desktop Navigation Links */}
                <ul className={`hidden md:flex space-x-8 text-white`}>
                    <li>
                        <a href="/" className="hover:text-gray-300 transition duration-200">Home</a>
                    </li>
                    <li>
                        <a href="/tasks" className="hover:text-gray-300 transition duration-200">Tasks</a>
                    </li>
                    <li>
                        <a href="/about" className="hover:text-gray-300 transition duration-200">About</a>
                    </li>
                </ul>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white text-2xl">
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-teal-400 py-4`}>
                <ul className="space-y-4 text-white text-center">
                    <li>
                        <a href="/" className="block hover:text-gray-300 transition duration-200">Home</a>
                    </li>
                    <li>
                        <a href="/tasks" className="block hover:text-gray-300 transition duration-200">Tasks</a>
                    </li>
                    <li>
                        <a href="/about" className="block hover:text-gray-300 transition duration-200">About</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
