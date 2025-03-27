// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-[#02103d] to-[#063c70] bg-opacity-60 backdrop-blur-sm text-white text-center p-5 w-full z-50">
            <p className="font-source-sans">© 2024 Koolch.ai. All rights reserved.</p>
            <ul className="list-none mt-4">
                <li className="inline-block mx-4"><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-source-sans">Privacy Policy</a></li>
                <li className="inline-block mx-4"><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-source-sans">Terms of Service</a></li>
                <li className="inline-block mx-4"><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 font-source-sans">Contact Us</a></li>
            </ul>
        </footer>
    );
};

export default Footer;