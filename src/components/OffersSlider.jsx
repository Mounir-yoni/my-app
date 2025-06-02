"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://back-end-obur.onrender.com/api/v1';

const OffersSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
    };

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get('https://back-end-obur.onrender.com/api/v1/voyages', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                });
                const offersArray = Array.isArray(response.data) ? response.data : response.data.data || [];
                const duplicatedOffers = [...offersArray, ...offersArray, ...offersArray];
                setOffers(duplicatedOffers);
            } catch (error) {
                console.error('Error fetching offers:', error);
                // Set empty array as fallback
                setOffers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            const next = prev + 1;
            if (next >= offers.length / 3) {
                return 0;
            }
            return next;
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => {
            const next = prev - 1;
            if (next < 0) {
                return Math.floor(offers.length / 3) - 1;
            }
            return next;
        });
    };

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    if (loading) {
        return (
            <motion.section
                className="py-20 bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center text-dark-blue mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Special Offers
                    </motion.h2>
                    <div className="flex justify-center items-center h-64">
                        <motion.div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </div>
            </motion.section>
        );
    }

    if (error) {
        return (
            <motion.section
                className="py-20 bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center text-dark-blue mb-12"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Special Offers
                    </motion.h2>
                    <motion.div
                        className="text-center text-red-500"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {error}
                    </motion.div>
                </div>
            </motion.section>
        );
    }

    if (offers.length === 0) {
        return (
            <motion.section
                className="py-20 bg-gray-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-4xl font-bold text-center text-dark-blue"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Special Offers
                    </motion.h2>
                    <motion.div
                        className="text-center text-gray-500"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        No offers available at the moment.
                    </motion.div>
                </div>
            </motion.section>
        );
    }

    return (
        <motion.section
            className="py-20 bg-gray-50 overflow-x-hidden mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container px-8 mx-auto">
                <motion.div
                    className="flex flex-col items-center mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-blue text-center mb-8">Special Offers 🌟</h2>
                </motion.div>

                <div className="relative">
                    <div className="overflow-x-hidden">
                        <motion.div
                            className="flex transition-transform duration-500 ease-in-out gap-8 snap-x snap-mandatory"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            animate={{ x: `-${currentSlide * 100}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            {offers.map((offer, index) => (
                                <motion.div
                                    key={`${offer._id || index}-${Math.floor(index / (offers.length / 3))}`}
                                    className="w-full sm:w-1/3 lg:w-1/3 mt-10 mb-10 flex-shrink-0 snap-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -16, transition: { duration: 0.3 } }}
                                >
                                    <motion.div
                                        className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="relative h-48">
                                            <img
                                                src={offer.image}
                                                alt={offer.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <motion.h3
                                                className="text-xl font-semibold text-dark-blue mb-2"
                                                whileHover={{ color: "#B45309" }}
                                            >
                                                {offer.title}
                                            </motion.h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {offer.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <motion.p
                                                    className="text-orange-500 font-bold text-2xl text-amber-700"
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {offer.prix} DA
                                                </motion.p>
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Link
                                                        href={`/offers/${offer._id}`}
                                                        className="text-dark-blue hover:text-orange-500 text-sm font-semibold flex items-center gap-2"
                                                        prefetch={true}
                                                    >
                                                        Learn More<FontAwesomeIcon icon={faArrowRight} />
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons */}
                    <motion.button
                        onClick={prevSlide}
                        className="absolute left-5 top-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
                        whileHover={{ scale: 1.1, backgroundColor: "#F3F4F6" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={nextSlide}
                        className="absolute right-5 top-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
                        whileHover={{ scale: 1.1, backgroundColor: "#F3F4F6" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-5 h-5 mr-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>

                {/* View All Button */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/offers"
                            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-amber-700 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors duration-300 font-semibold"
                            prefetch={true}
                        >
                            View All Offers
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default OffersSlider; 