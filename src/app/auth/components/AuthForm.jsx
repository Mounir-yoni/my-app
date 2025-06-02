'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://back-end-obur.onrender.com/api/v1';

export default function AuthForm() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        ville: '',
        postalCode: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Redirect if already authenticated
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                router.push('/');
            }
        }
    }, [router]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const validateForm = () => {
        if (!isLogin) {
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (!formData.phone || formData.phone.length < 10) {
                setError('Please enter a valid phone number');
                return false;
            }
            if (!formData.firstName || !formData.lastName) {
                setError('Please enter both first name and last name');
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            if (isLogin) {
                const response = await axios.post(`${API_URL}/auth/login`, {
                    email: formData.email,
                    password: formData.password
                }, {
                    withCredentials: true
                });

                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    router.push('/');
                }
            } else {
                const response = await axios.post(`${API_URL}/auth/signup`, {
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    passwordConfirm: formData.confirmPassword,
                    phone: formData.phone,
                    address: formData.address,
                    ville: formData.ville,
                    postalCode: formData.postalCode
                }, {
                    withCredentials: true
                });

                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    router.push('/');
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
            if (err.message.includes('Network Error')) {
                setError('Unable to connect to the server. Please check your internet connection and try again.');
            } else {
                setError(err.response?.data?.message || err.message || 'An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            ville: '',
            postalCode: ''
        });
    };


    return (
        <>
            {/* Form Section */}
            <div className="p-10 flex items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <h1 className="text-3xl font-bold text-amber-800 mb-6">
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </h1>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            {!isLogin && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-4 text-amber-700" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                required
                                            />
                                        </div>
                                        <div className="relative">
                                            <FontAwesomeIcon icon={faUser} className="absolute left-3 top-4 text-amber-700" />
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-4 text-amber-700" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                            required
                                            pattern="[0-9]{10}"
                                            title="Please enter a valid 10-digit phone number"
                                        />
                                    </div>
                                </>
                            )}
                            <div className="relative">
                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-4 text-amber-700" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-4 text-amber-700" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                    required
                                />
                            </div>
                            {!isLogin && (
                                <div className="relative">
                                    <FontAwesomeIcon icon={faLock} className="absolute left-3 top-4 text-amber-700" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                                        required
                                    />
                                </div>
                            )}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Overlay Section */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white flex flex-col justify-center items-center p-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold mb-4">
                        {isLogin ? 'New Here?' : 'Welcome Back!'}
                    </h2>
                    <p className="mb-8 text-amber-100">
                        {isLogin
                            ? 'Create an account and start your journey with us'
                            : 'Sign in to access your account and continue your journey'}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleForm}
                        className="bg-white text-amber-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition"
                    >
                        {isLogin ? 'Create Account' : 'Sign In'}
                    </motion.button>
                </motion.div>
            </div>
        </>
    );
} 