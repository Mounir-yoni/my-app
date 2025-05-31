"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faTags, faScrewdriverWrench, faUser, faEnvelope, faUserCircle, faSignOutAlt, faPersonRifle, faDashboard } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
        window.location.reload();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return pathname === path;
    };
    const userinfo = JSON.parse(localStorage.getItem('user'));
    const width = window.innerWidth;

    // Check if user has admin or manager role
    const isAdminOrManager = userinfo?.role === 'admin' || userinfo?.role === 'superadmin' || userinfo?.role === 'manager';

    return (
        <nav className={`bg-white shadow-md fixed w-full z-50`}>
            <div className="  px-4 ">
                <div className={`flex justify-between items-center ${window.innerWidth > 990 ? 'w-[90%]' : 'max-w-full'} h-20 mx-auto`}>
                    {/* Logo */}
                    <Link href="/" className={`flex ${width > 990 ? 'ml-0' : 'm-[100px]'}`}>
                        <span className="text-2xl font-bold text-blue-900">Travel Agency</span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-8">
                            <Link
                                href="/"
                                className={`text-blue-900 text-u hover:text-amber-700 transition-colors relative group delay-150 duration-300 ease-in-out ${isActive('/') ? 'text-amber-700' : ''
                                    }`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faHouseUser} />
                                Home
                                <span className={`absolute  -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300  ${isActive('/') ? 'scale-x-100' : ''
                                    }`}></span>
                            </Link>
                            <Link
                                href="/offers"
                                className={`text-blue-900  ml-4 hover:text-amber-700 transition-colors relative group ${isActive('/offers') ? 'text-amber-700' : ''
                                    }`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faTags} />
                                Offers
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/offers') ? 'scale-x-100' : ''
                                    }`}></span>
                            </Link>

                            <Link
                                href="/about"
                                className={`text-blue-900  ml-4 hover:text-amber-700 transition-colors relative group ${isActive('/about') ? 'text-amber-700' : ''
                                    }`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faUser} />
                                About
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : ''
                                    }`}></span>
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-blue-900  ml-4 hover:text-amber-700 transition-colors relative group ${isActive('/contact') ? 'text-amber-700' : ''
                                    }`}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faEnvelope} />
                                Contact
                                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-amber-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : ''
                                    }`}></span>
                            </Link>
                        </div>
                    </div>

                    {/* Connection Button */}
                    <div className="hidden md:flex items-center">
                        {localStorage.getItem('token') ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center space-x-2 text-amber-700 hover:text-amber-800"
                                >
                                    <FontAwesomeIcon icon={faUser} className="text-lg" />
                                    <span>{userinfo.Firstname + " " + userinfo.Lastname}</span>
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
                                className="bg-transparent hover:border-2 hover:border-blue-950 text-blue-950 px-6 py-2 rounded-xl font-semibold transition-all duration-300 ease-in-out delay-150 flex items-center gap-2  hover:scale-105"
                            >
                                <FontAwesomeIcon icon={faUserCircle} />
                                Connexion
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-dark-blue "
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
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className={`text-dark-blue hover:text-amber-700 transition-colors ${isActive('/') ? 'text-amber-700' : ''}`}
                                onClick={toggleMenu}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faHouseUser} />
                                Home
                            </Link>
                            <Link
                                href="/offers"
                                className={`text-dark-blue hover:text-amber-700 transition-colors ${isActive('/offers') ? 'text-amber-700' : ''}`}
                                onClick={toggleMenu}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faTags} />
                                Offers
                            </Link>
                            <Link
                                href="/services"
                                className={`text-dark-blue hover:text-amber-700 transition-colors ${isActive('/services') ? 'text-amber-700' : ''}`}
                                onClick={toggleMenu}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faScrewdriverWrench} />
                                Services
                            </Link>
                            <Link
                                href="/about"
                                className={`text-dark-blue hover:text-amber-700 transition-colors ${isActive('/about') ? 'text-amber-700' : ''}`}
                                onClick={toggleMenu}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faUser} />
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className={`text-dark-blue hover:text-amber-700 transition-colors ${isActive('/contact') ? 'text-amber-700' : ''}`}
                                onClick={toggleMenu}
                            >
                                <FontAwesomeIcon className='mr-2' icon={faEnvelope} />
                                Contact
                            </Link>

                            {/* Mobile Authentication Section */}
                            {localStorage.getItem('token') ? (
                                <>
                                    <div className="border-t border-gray-200 pt-4 mt-2">
                                        <div className="flex items-center space-x-2 text-amber-700 mb-4">
                                            <FontAwesomeIcon icon={faUser} className="text-lg" />
                                            <span>{userinfo.Firstname + " " + userinfo.Lastname}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                toggleMenu();
                                            }}
                                            className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-amber-700"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                            <span>Logout</span>
                                        </button>
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-amber-700 mt-2"
                                            onClick={toggleMenu}
                                        >
                                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                                            <span>Profile</span>
                                        </Link>
                                        {isAdminOrManager && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-amber-700 mt-2"
                                                onClick={toggleMenu}
                                            >
                                                <FontAwesomeIcon icon={faDashboard} className="mr-2" />
                                                <span>Admin</span>
                                            </Link>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href="/auth"
                                    className="bg-transparent text-blue-950 font-semibold transition-colors inline-flex items-center w-fit"
                                    onClick={toggleMenu}
                                >
                                    <FontAwesomeIcon icon={faUserCircle} className='mr-2' />
                                    Connexion
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 