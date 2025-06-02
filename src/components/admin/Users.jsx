'use client';

import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHome, FaCity, FaSearch, FaFilter, FaSync, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://back-end-obur.onrender.com/api/v1';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Détails de l'utilisateur</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FaUser className="text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Nom complet</p>
                                    <p className="font-medium">{user.Firstname} {user.Lastname}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-green-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhone className="text-purple-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Téléphone</p>
                                    <p className="font-medium">{user.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FaHome className="text-orange-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Adresse</p>
                                    <p className="font-medium">{user.Adress}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCity className="text-red-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Ville</p>
                                    <p className="font-medium">{user.ville}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaUser className="text-blue-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Rôle</p>
                                    <p className="font-medium">{user.role || 'Utilisateur'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        keyword: '',
        role: ''
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');

            const params = Object.entries(filters).reduce((acc, [key, value]) => {
                if (value && value.trim() !== '') {
                    acc[key] = value;
                }
                return acc;
            }, {});

            const response = await axios.get(`${API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params
            });

            setUsers(response.data.data || []);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.response?.data?.message || err.message || 'Failed to fetch users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUsers();
    };

    const clearFilters = () => {
        setFilters({
            keyword: '',
            role: ''
        });
        fetchUsers();
    };

    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-10">Utilisateurs</h1>
                <div className="space-y-6">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/6"></div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-10">Utilisateurs</h1>
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline mb-4">{error}</span>
                    <button
                        onClick={fetchUsers}
                        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <FaSync className="animate-spin" />
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-10">Utilisateurs</h1>

            {/* Filtration Bar */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="keyword"
                                    value={filters.keyword}
                                    onChange={handleFilterChange}
                                    placeholder="Rechercher par nom, email..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                            <select
                                name="role"
                                value={filters.role}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Tous les rôles</option>
                                <option value="user">Utilisateur</option>
                                <option value="admin">Administrateur</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                        >
                            <FaFilter />
                            Réinitialiser
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <FaSearch />
                            Rechercher
                        </button>
                    </div>
                </form>
            </div>

            <div className="space-y-6">
                {users.map((user, index) => (
                    <div
                        key={user._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100 cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                        }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <h2 className="text-2xl font-semibold text-gray-900">{user.Firstname} {user.Lastname}</h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <FaEnvelope className="mr-2 text-blue-600" />
                                        <span className="font-medium">{user.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaPhone className="mr-2 text-green-600" />
                                        <span className="font-medium">{user.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCity className="mr-2 text-purple-600" />
                                        <span className="font-medium">{user.ville}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaUser className="mr-2 text-orange-500" />
                                        <span className="font-medium">{user.role || 'Utilisateur'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedUser(user);
                                        setIsModalOpen(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    <FaEdit />
                                    Voir détails
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <UserDetailsModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            />
        </div>
    );
};

export default Users; 