"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faTags, faScrewdriverWrench, faUser, faEnvelope, faUserCircle, faSignOutAlt, faPersonRifle, faDashboard } from '@fortawesome/free-solid-svg-icons';
import { getLocalStorage, getParsedLocalStorage, removeLocalStorage } from '../utils/storage';

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [width, setWidth] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        const storedUser = getParsedLocalStorage('user');
        if (storedUser) {
            setUser(storedUser);
        }

        // Set initial width
        setWidth(window.innerWidth);

        // Add event listener for window resize
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        removeLocalStorage('token');
        removeLocalStorage('user');
        setUser(null);
        router.push('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return pathname === path;
    };
    const userinfo = getParsedLocalStorage('user');

    // Check if user has admin or manager role
    const isAdminOrManager = userinfo?.role === 'admin' || userinfo?.role === 'superadmin' || userinfo?.role === 'manager';

    // Don't render anything until mounted to prevent hydration mismatch
    if (!isMounted) {
        return null;
    }

    return (
        <nav className={`bg-white shadow-md fixed w-full z-50`}>
            <div className="px-4">
                <div className={`flex justify-between items-center ${width > 990 ? 'w-[90%]' : 'w-full'} h-20 mx-auto relative`}>
                    {/* Mobile Menu Button - Moved to right */}
                    <button
                        className="md:hidden text-blue-900 absolute right-4"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Logo - Centered on mobile */}
                    <Link href="/" className={`flex mx-auto md:mx-0 ${width > 990 ? 'ml-0' : ''}`}>
                        <span className="text-2xl font-bold text-blue-900">Travel Agency</span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-8">
                            <Link
                                href="/"
                                className={`text-blue-900 text-u hover:text-amber-700 transition-colors relative group delay-150 duration-300 ease-in-out ${isActive('/') ? 'text-amber-700' : ''}`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faHouseUser} />
                                Home
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : ''}`}></span>
                            </Link>
                            <Link
                                href="/offers"
                                className={`text-blue-900 ml-4 hover:text-amber-700 transition-colors relative group ${isActive('/offers') ? 'text-amber-700' : ''}`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faTags} />
                                Offers
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/offers') ? 'scale-x-100' : ''}`}></span>
                            </Link>

                            <Link
                                href="/about"
                                className={`text-blue-900 ml-4 hover:text-amber-700 transition-colors relative group ${isActive('/about') ? 'text-amber-700' : ''}`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faUser} />
                                About
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : ''}`}></span>
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-blue-900 ml-4 hover:text-amber-700 transition-colors relative group ${isActive('/contact') ? 'text-amber-700' : ''}`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faEnvelope} />
                                Contact
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : ''}`}></span>
                            </Link>
                        </div>
                    </div>

                    {/* Connection Button */}
                    <div className="hidden md:flex items-center">
                        {getLocalStorage('token') ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center space-x-2 text-amber-700 hover:text-amber-800"
                                >
                                    <FontAwesomeIcon icon={faUser} className="text-lg" />
                                    <span>{userinfo?.Firstname} {userinfo?.Lastname}</span>
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                toggleMenu();
                                            }}
                                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <span>Logout</span>
                                        </button>
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                                            onClick={() => {
                                                toggleMenu();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faUser} />
                                            <span>Profile</span>
                                        </Link>
                                        {isAdminOrManager && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                                                onClick={() => {
                                                    toggleMenu();
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faDashboard} />
                                                <span>Admin</span>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="bg-transparent hover:border-2 hover:border-blue-950 text-blue-950 px-6 py-2 rounded-xl font-semibold transition-all duration-300 ease-in-out delay-150 flex items-center gap-2 hover:scale-105"
                            >
                                <FontAwesomeIcon icon={faUserCircle} />
                                Connexion
                            </Link>
                        )}
                    </div>

                    {/* Mobile Navigation - Improved styling */}
                    {isMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out">
                            <div className="px-4 py-3 space-y-2">
                                <Link
                                    href="/"
                                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-amber-50 transition-colors ${isActive('/') ? 'text-amber-700' : 'text-blue-900'}`}
                                    onClick={toggleMenu}
                                >
                                    <FontAwesomeIcon className='mr-2' icon={faHouseUser} />
                                    Home
                                </Link>
                                <Link
                                    href="/offers"
                                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-amber-50 transition-colors ${isActive('/offers') ? 'text-amber-700' : 'text-blue-900'}`}
                                    onClick={toggleMenu}
                                >
                                    <FontAwesomeIcon className='mr-2' icon={faTags} />
                                    Offers
                                </Link>
                                <Link
                                    href="/about"
                                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-amber-50 transition-colors ${isActive('/about') ? 'text-amber-700' : 'text-blue-900'}`}
                                    onClick={toggleMenu}
                                >
                                    <FontAwesomeIcon className='mr-2' icon={faUser} />
                                    About
                                </Link>
                                <Link
                                    href="/contact"
                                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-amber-50 transition-colors ${isActive('/contact') ? 'text-amber-700' : 'text-blue-900'}`}
                                    onClick={toggleMenu}
                                >
                                    <FontAwesomeIcon className='mr-2' icon={faEnvelope} />
                                    Contact
                                </Link>
                                {getLocalStorage('token') ? (
                                    <>
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-amber-50 transition-colors"
                                            onClick={toggleMenu}
                                        >
                                            <FontAwesomeIcon className='mr-2' icon={faUser} />
                                            Profile
                                        </Link>
                                        {isAdminOrManager && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-amber-50 transition-colors"
                                                onClick={toggleMenu}
                                            >
                                                <FontAwesomeIcon className='mr-2' icon={faDashboard} />
                                                Admin
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                toggleMenu();
                                            }}
                                            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-amber-50 transition-colors"
                                        >
                                            <FontAwesomeIcon className='mr-2' icon={faSignOutAlt} />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/auth"
                                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-amber-50 transition-colors"
                                        onClick={toggleMenu}
                                    >
                                        <FontAwesomeIcon className='mr-2' icon={faUserCircle} />
                                        Connexion
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 