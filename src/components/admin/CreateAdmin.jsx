'use client';

import { useState } from 'react';
import axios from 'axios';
import { FaUserPlus, FaLock } from 'react-icons/fa';

const CreateAdmin = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: 'admin', // Default role
        telephone: '',
        adresse: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate passwords match
        if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const jsonData = {
                Firstname: formData.nom,
                Lastname: formData.prenom,
                email: formData.email,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,
                role: formData.role,
                telephone: formData.telephone,
                adresse: formData.adresse
            };

            const response = await axios.post('https://back-end-agence-de-voyage.onrender.com/api/v1/users', jsonData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccess(true);
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                password: '',
                passwordConfirm: '',
                role: 'admin',
                telephone: '',
                adresse: ''
            });

            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Error details:', err);
            setError(err.response?.data?.message || 'Failed to create admin account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2 sm:p-4 md:p-6 max-w-4xl mx-auto transition-all duration-300">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Create New Admin Account
            </h1>

            {success && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl animate-fade-in">
                    Admin account created successfully!
                </div>
            )}

            {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl animate-fade-in">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-300 hover:shadow-xl">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                minLength="6"
                                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base pl-10"
                            />
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="passwordConfirm"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                required
                                minLength="6"
                                className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base pl-10"
                            />
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        >
                            <option value="user">user</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            placeholder="Address"
                            required
                            rows="3"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <FaUserPlus className="w-4 h-4" />
                                <span>Create Admin Account</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }

                /* Custom scrollbar for better mobile experience */
                .overflow-y-auto {
                    scrollbar-width: thin;
                    scrollbar-color: #CBD5E0 #EDF2F7;
                }

                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #EDF2F7;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background-color: #CBD5E0;
                    border-radius: 3px;
                }
            `}</style>
        </div>
    );
};

export default CreateAdmin; 