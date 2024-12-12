"use client";
import React, { useState } from "react";
import Link from "next/link";

const NAV_MENU = [
    { name: "What we do", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative z-50 pt-4"> {/* Added padding-top: 4 */}
            <div className="container mx-auto flex justify-center">
                <div className="flex items-center justify-between w-full max-w-5xl bg-white shadow-lg rounded-full py-3 px-8 md:px-12">
                    {/* Branding */}
                    <div className="text-green-900 text-2xl font-bold">pawcare</div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {NAV_MENU.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="text-gray-800 hover:text-green-900 font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Call-to-Action Button */}
                    <Link
                        href="/get-started"
                        className="hidden md:inline-block bg-green-300 text-green-900 py-2 px-6 rounded-full font-semibold hover:bg-green-400 transition duration-200"
                    >
                        Get started
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-green-900"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-lg py-4">
                    <div className="flex flex-col items-center space-y-4">
                        {NAV_MENU.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-gray-800 hover:text-green-900 font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/get-started"
                            onClick={() => setIsMenuOpen(false)}
                            className="bg-green-300 text-green-900 py-2 px-6 rounded-full font-semibold hover:bg-green-400 transition duration-200"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
