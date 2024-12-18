import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-4 py-8 bg-emerald-950 text-white w-full">
      {/* Logo and Copyright */}
      <div className="flex flex-col items-center md:items-start">
        <h2 className="text-lg font-bold" style={{ fontFamily: "'Briella Rose', cursive" }}>
          pawcare
        </h2>
        <p className="text-sm" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
          &copy; 2024, All rights reserved
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0">
        <a 
          href="/terms" 
          className="text-sm hover:underline"
          style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
        >
          Terms & Conditions
        </a>
        <a 
          href="/privacy" 
          className="text-sm hover:underline"
          style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
        >
          Privacy Policy
        </a>
        <a 
          href="/cookies" 
          className="text-sm hover:underline"
          style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
        >
          Cookies
        </a>
      </div>

      {/* Social Media Icons */}
      <div className="flex items-center space-x-6 mt-4 md:mt-0">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 00-3.16 19.5c-.07-.63-.13-1.6.03-2.3.15-.63.98-4.01.98-4.01s-.25-.5-.25-1.23c0-1.15.67-2.01 1.5-2.01.71 0 1.05.53 1.05 1.17 0 .71-.45 1.77-.69 2.76-.2.82.42 1.49 1.24 1.49 1.49 0 2.49-1.57 2.49-3.43 0-1.79-1.29-3.13-3.13-3.13-2.29 0-3.72 1.71-3.72 3.62 0 .66.19 1.13.5 1.49.14.17.16.23.11.42-.04.14-.12.49-.16.63-.05.2-.21.27-.39.2-1.09-.45-1.6-1.66-1.6-3.02 0-2.25 1.9-4.94 5.66-4.94 3.03 0 5.02 2.19 5.02 4.54 0 3.11-1.73 5.43-4.28 5.43-.86 0-1.66-.46-1.94-1 0 0-.46 1.84-.56 2.19-.17.61-.5 1.22-.8 1.7C10.52 19.84 11.25 20 12 20a8 8 0 100-16 8 8 0 000 16z"/>
          </svg>
        </a>
        <a 
          href="https://twitter.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
