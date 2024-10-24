import Link from 'next/link';
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Main Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4 sm:text-4xl">
            Customise Your Product
          </h2>
          <p className="max-w-md mx-auto text-gray-400 mb-6">
            Build something extraordinary. Let's work together to create the perfect experience, tailored to your needs.
          </p>
          <Link
            href="#"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-8 rounded-full font-medium transition duration-300"
          >
            Get Started
          </Link>
        </div>

        {/* Section 2: Links and Social Media */}
        <div className="mt-12 pt-6 flex flex-col lg:flex-row justify-between items-center border-t border-gray-700 lg:space-y-0">
          <ul className="flex flex-wrap justify-center space-x-4">
            <li>
              <Link href="#" className="hover:text-indigo-500 transition duration-300">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-500 transition duration-300">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-indigo-500 transition duration-300">Cookies</Link>
            </li>
          </ul>

          <div className="text-center text-gray-500 text-sm ml:0 md:-ml-52 pt-2 md:pt-0">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 pt-4 md:pt-0">
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              <Twitter size={20} />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
