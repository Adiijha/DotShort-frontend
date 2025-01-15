import React, {} from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {

    return (
        <header className="flex justify-between items-center w-full h-20 px-4 sm:px-16  text-white">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-teal-500 to-teal-400 font-bold text-3xl sm:text-4xl">
                    DotShort
                </div>
            </Link>

            {/* Navigation Links (Desktop) */}
            <nav className="hidden sm:flex gap-8">
                <a href="#pricing" className="text-white hover:text-teal-400 transition duration-300 text-lg">
                    Pricing
                </a>
                <a href="#about" className="text-white hover:text-teal-400 transition duration-300 text-lg">
                    About
                </a>
                <a href="#contact" className="text-white hover:text-teal-400 transition duration-300 text-lg">
                    Contact
                </a>
                <Link to="/generateqr" className="text-white hover:text-teal-400 transition duration-300 text-lg">
                    QR Generator
                </Link>
                <Link to="/shortenlink" className="text-white hover:text-teal-400 transition duration-300 text-lg">
                    Link Shortener
                </Link>
            </nav>

            {/* Buttons */}
            <div className="hidden sm:flex space-x-6">
                <button className="text-white bg-teal-500 hover:bg-transparent hover:text-teal-500 border-2 border-teal-500 px-6 py-2 rounded-full font-medium transition duration-300 transform">
                    Sign Up
                </button>
                <button className="text-white bg-purple-500 hover:bg-transparent hover:text-purple-500 border-2 border-purple-500 px-6 py-2 rounded-full font-medium transition duration-300 transform">
                    Sign In
                </button>
            </div>

        </header>
    );
};

export default Header;
