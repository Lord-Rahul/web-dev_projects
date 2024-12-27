import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-400 to-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link className="flex gap-2" to="/">
          <img className="w-8 h-8" src="/list.png" alt="logo" />
          <div className="text-white text-2xl font-extrabold">To-do List</div>
        </Link>
        <ul className="hidden md:flex space-x-8 text-white">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
        </ul>
        <button onClick={toggleMenu} className="text-white text-2xl md:hidden">
          ☰
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-teal-400 py-4">
          <ul className="space-y-4 text-center text-white">
            <li>
              <Link to="/" className="block hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="block hover:text-gray-300">About</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
