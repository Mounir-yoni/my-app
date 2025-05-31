"use client";

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhone,
    faClock,
    faLocationDot
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebook,
    faTiktok,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';

export default function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            {/* Social Media */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-xl p-8"
            >
                <h2 className="text-2xl font-semibold text-amber-800 mb-6">Follow Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition group"
                    >
                        <FontAwesomeIcon icon={faFacebook} className="w-10 h-10 text-blue-600 group-hover:scale-110 transition" />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
                    >
                        <FontAwesomeIcon icon={faTiktok} className="w-8 h-8 text-gray-800 group-hover:scale-110 transition" />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition group"
                    >
                        <FontAwesomeIcon icon={faInstagram} className="w-8 h-8 text-pink-600 group-hover:scale-110 transition" />
                    </motion.a>
                </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8"
            >
                <h2 className="text-2xl font-semibold text-amber-800 mb-6">Contact Information</h2>
                <div className="space-y-6">
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                    >
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Email</h3>
                            <p className="text-gray-600">contact@travelagency.com</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                    >
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faPhone} className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Phone</h3>
                            <p className="text-gray-600">+213 123 456 789</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                    >
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Working Hours</h3>
                            <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-start"
                    >
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                            <FontAwesomeIcon icon={faLocationDot} className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">Location</h3>
                            <p className="text-gray-600">123 Travel Street, Algiers, Algeria</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
} 