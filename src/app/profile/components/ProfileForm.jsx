"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faCity, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        ville: '',
        postalCode: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/auth');
                return;
            }

            try {
                const response = await axios.get('https://back-end-agence-de-voyage.onrender.com/api/v1/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userData = response.data.data;
                setFormData({
                    firstName: userData.Firstname || '',
                    lastName: userData.Lastname || '',
                    email: userData.email || '',
                    phone: userData.phone || '',
                    address: userData.address || '',
                    ville: userData.ville || '',
                    postalCode: userData.postalCode || ''
                });
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data. Please try again.');
            }
        };

        fetchUserData();
    }, [router]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth');
            return;
        }

        try {
            const response = await axios.patch(
                'https://back-end-agence-de-voyage.onrender.com/api/v1/users/updateMe',
                {
                    Firstname: formData.firstName,
                    Lastname: formData.lastName,
                    phone: formData.phone,
                    address: formData.address,
                    ville: formData.ville,
                    postalCode: formData.postalCode
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSuccess('Profile updated successfully!');
            localStorage.setItem('user', JSON.stringify(response.data.data));
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-6"
        >
            <h1 className="text-3xl font-bold text-amber-800 mb-6">Profile Settings</h1>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-4 text-amber-700" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        disabled
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg bg-gray-50 cursor-not-allowed"
                    />
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

                <div className="relative">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-4 text-amber-700" />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <FontAwesomeIcon icon={faCity} className="absolute left-3 top-4 text-amber-700" />
                        <input
                            type="text"
                            name="ville"
                            placeholder="City"
                            value={formData.ville}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                        />
                    </div>
                    <div className="relative">
                        <FontAwesomeIcon icon={faHashtag} className="absolute left-3 top-4 text-amber-700" />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-700 transition"
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition disabled:opacity-50"
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </motion.button>
            </form>
        </motion.div>
    );
} 