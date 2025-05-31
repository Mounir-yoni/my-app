"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '../../../context/NotificationContext';

export default function ContactForm() {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        showNotification('Message sent successfully! We will contact you soon.', 'success');
        setFormData({
            name: '',
            surname: '',
            phone: '',
            email: '',
            message: ''
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
        >
            <h2 className="text-2xl font-semibold text-amber-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    ></textarea>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-amber-700 text-white py-4 rounded-xl hover:bg-amber-800 transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Send Message
                </motion.button>
            </form>
        </motion.div>
    );
} 