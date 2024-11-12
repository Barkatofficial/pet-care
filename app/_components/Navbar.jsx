"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/auth';
import Preloader from './Loader';

const NAV_MENU = [
    { name: "Home", path: '/' },
    { name: "About", path: '/about' },
    { name: "Explore", path: '/explore' },
    { name: "Blogging", path: '/blogging' },
    { name: "Contact", path: '/contact' }
];

export default function Navbar() {
    const { user, authLoading } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <header className="sticky top-0 z-50 bg-white shadow-md py-4">
            <div className="flex items-center justify-between px-4 md:px-10">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src='/logo.svg'
                        alt='logo'
                        width={150}
                        height={60}
                        className="hover:opacity-90 transition-opacity duration-300 cursor-pointer"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {NAV_MENU.map((item, idx) => (
                        <Link
                            href={item.path}
                            key={idx}
                            className="hover:text-yellow-500 duration-150"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {authLoading ? (
                        <Preloader
                            bgHeight="40px"
                            bgWidth="40px"
                            width="2rem"
                            height="2rem"
                            color="#FFE39C"
                        />
                    ) : (
                        user ? (
                            <div className="relative group">
                                <Image
                                    src={user?.photoURL}
                                    alt="profile-image"
                                    width={40}
                                    height={40}
                                    className="rounded-full cursor-pointer"
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg p-2 hidden group-hover:block">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/my-booking"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                    >
                                        My Bookings
                                    </Link>
                                    <button
                                        // onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 rounded-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="bg-yellow-400 text-black py-2 px-6 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
                            >
                                Login
                            </Link>
                        )
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={handleMenuToggle}>
                        {isMenuOpen ? (
                            <XMarkIcon className="h-8 w-8 text-yellow-500" />
                        ) : (
                            <Bars3Icon className="h-8 w-8 text-yellow-500" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="fixed top-16 left-0 right-0 z-50 md:hidden bg-white shadow-lg h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-center space-y-4 py-6">
                    {NAV_MENU.map((item, idx) => (
                        <Link
                            href={item.path}
                            key={idx}
                            onClick={handleMenuToggle}
                            className="text-lg font-medium text-gray-700 hover:text-yellow-500"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex flex-col items-center space-y-4">
                            <Image
                                src={user?.photoURL}
                                alt="profile-image"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <Link
                                href="/profile"
                                onClick={handleMenuToggle}
                                className="text-lg text-gray-700 hover:text-yellow-500"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/my-booking"
                                onClick={handleMenuToggle}
                                className="text-lg text-gray-700 hover:text-yellow-500"
                            >
                                My Bookings
                            </Link>
                            <button
                                // onClick={handleMobileLogout}
                                className="text-lg text-red-500 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/auth/login"
                            onClick={handleMenuToggle}
                            className="mx-6 bg-yellow-400 text-black py-2 px-6 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
