"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

function Header() {
    const Menu = [
        { name: "Home", path: '/' },
        { name: "About", path: '/about' },
        { name: "Explore", path: '/explore' },
        { name: "Blogging", path: '/blogging' },
        { name: "Contact", path: '/contact' }
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const { user } = useKindeBrowserClient();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <header className={`sticky top-0 z-50 bg-white shadow-md py-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src='/logo.svg'
                            alt='logo'
                            width={150}
                            height={60}
                            className="hover:opacity-90 transition-opacity duration-300 cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {Menu.map((item, idx) => (
                        <Link href={item.path} key={idx}>
                            <span className="hover:text-yellow-500 cursor-pointer transition-transform hover:scale-110 duration-300">
                                {item.name}
                            </span>
                        </Link>
                    ))}


                    {/* Profile or Login/Sign Up */}
                    {user ? (
                        <Popover>
                            <PopoverTrigger>
                                <Image
                                    src={user?.picture || '/default-profile.png'}
                                    alt='profile-image'
                                    width={40}
                                    height={40}
                                    className='rounded-full cursor-pointer'
                                />
                            </PopoverTrigger>
                            <PopoverContent className='w-44'>
                                <ul className='flex flex-col gap-2'>
                                    <Link href='/my-booking' className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Doctor Bookings</Link>
                                    <Link href='/my-appointment' className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Service Bookings</Link>
                                    <LogoutLink>
                                        <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Logout</li>
                                    </LogoutLink>
                                </ul>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <LoginLink>
                            <button className="bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 hover:scale-105 transition-transform duration-300">
                                Get Started!
                            </button>
                        </LoginLink>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                <>
                    <div className="top-10 left-12 right-0 z-50 md:hidden bg-white shadow-lg h-[calc(100vh-16rem)] overflow-y-auto flex items-center justify-center flex-col">
                        <ul className="flex flex-col items-center space-y-4 py-6">
                            {Menu.map((item) => (
                                <Link href={item.path} key={item.id}>
                                    <li onClick={() => setIsMenuOpen(false)} className="list-none hover:text-yellow-500 cursor-pointer transition-transform hover:scale-110 duration-300">
                                        {item.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>

                        {/* Profile or Login/Sign Up */}
                        {user ? (
                            <Popover>
                                <PopoverTrigger>
                                    <Image
                                        src={user?.picture || '/default-profile.png'}
                                        alt='profile-image'
                                        width={50}
                                        height={50}
                                        className='rounded-full cursor-pointer'
                                    />
                                </PopoverTrigger>
                                <PopoverContent className='w-44'>
                                    <ul className='flex flex-col gap-2'>
                                        {/* <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Profile</li> */}
                                        <Link onClick={() => setIsMenuOpen(false)} href='/my-booking' className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Doctor Bookings</Link>
                                        <Link onClick={() => setIsMenuOpen(false)} href='/my-appointment' className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Service Bookings</Link>
                                        <LogoutLink>
                                            <li className='cursor-pointer hover:bg-slate-100 p-2 rounded-md'>Logout</li>
                                        </LogoutLink>
                                    </ul>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <LoginLink>
                                <button className="bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 hover:scale-105 transition-transform duration-300">
                                    Get Started!
                                </button>
                            </LoginLink>
                        )}
                    </div>

                    <style jsx global>{`
                        body {
                            overflow: hidden;
                        }
                    `}</style>
                </>
            )}
        </header>
    );
}

export default Header;
