// src/components/Header.tsx
import React, { useState } from 'react'; // Import useState
import { Link as RouterLink } from 'react-router-dom';
import Logo from './Header/Logo'; // Import the Logo component

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="sticky top-0 p-5 flex justify-between items-center w-full backdrop-blur-sm bg-opacity-20 bg-gradient-to-r from-transparent to-blue-900/50 z-20">
            <a href="/#home" className="flex items-center text-white no-underline">
            <Logo width="10" height="10" />
                <span className="ml-2 text-xl font-bold tracking-wide font-source-sans">AsturLabs AI</span> {/* Text next to Logo, adjust ml-2 for spacing */}
            </a>

            {/* Hamburger Button for Mobile */}
            <button
                onClick={toggleMobileMenu}
                className="block md:hidden text-white focus:outline-none" // Hidden on medium and larger screens
                aria-label="Toggle mobile menu"
            >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.859a1 1 0 0 1-1.414 1.414l-4.586-4.586-4.586 4.586a1 1 0 0 1-1.414-1.414l4.586-4.586-4.586-4.586a1 1 0 0 1 1.414-1.414l4.586 4.586 4.586-4.586a1 1 0 0 1 1.414 1.414l-4.586 4.586 4.586 4.586z" />
                    ) : (
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                    )}
                </svg>
            </button>

            {/* Navigation Links */}
            <nav className={`md:block ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto`}> {/* Mobile menu show/hide */}
                <ul className={`list-none m-0 p-0 md:flex flex-col md:flex-row items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}> {/* Mobile menu list show/hide */}
                    <li className="ml-0 md:ml-7 mt-4 md:mt-0"><a href="/#home" className="text-gray-300 hover:text-white no-underline block px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-700 uppercase font-source-sans tracking-wide">Home</a></li>
                    <li className="ml-0 md:ml-7 mt-4 md:mt-0"><a href="/#why-us" className="text-gray-300 hover:text-white no-underline block px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-700 uppercase font-source-sans tracking-wide">Why Us</a></li>
                    <li className="ml-0 md:ml-7 mt-4 md:mt-0"><a href="/#approach" className="text-gray-300 hover:text-white no-underline block px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-700 uppercase font-source-sans tracking-wide">Approach</a></li>
                    <li className="ml-0 md:ml-7 mt-4 md:mt-0"><a href="/#team" className="text-gray-300 hover:text-white no-underline block px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-700 uppercase font-source-sans tracking-wide">Team</a></li>
                    <li className="ml-0 md:ml-7 mt-4 md:mt-0"><a href="/#insights" className="text-gray-300 hover:text-white no-underline block px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-700 uppercase font-source-sans tracking-wide">Insights</a></li>
                    <li className="ml-0 md:ml-7 mt-4 md:mt-0"><RouterLink to="/demo" className="text-white no-underline block px-4 py-2 rounded-full transition-colors duration-300 bg-blue-600 hover:bg-blue-700 uppercase font-source-sans tracking-wide">Demo</RouterLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;