"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { motion } from 'framer-motion'

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Adventure Enthusiast",
        text: "The best travel experience I've ever had! The team went above and beyond to make our trip unforgettable."
    },
    {
        name: "Michael Chen",
        role: "Business Traveler",
        text: "Professional service and attention to detail. They handled everything perfectly from start to finish."
    },
    {
        name: "Emma Davis",
        role: "Family Vacationer",
        text: "Our family trip was perfectly organized. The kids loved it, and we couldn't be happier with the service."
    }
];

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-dark-blue mb-16">
                    What Our Clients Say 💎
                </h2>

                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-x-hidden overflow-y-visible rounded-xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out gap-6 snap-x snap-mandatory"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                        >
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="w-full flex-shrink-0 snap-center"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                        <div className="flex items-center mb-6">

                                            <div>
                                                <h3 className="text-xl font-semibold text-dark-blue">
                                                    {testimonial.name}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex items-center gap-1 mb-4 text-orange-400">
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={fullStar}
                                                    className="w-4 h-4 "
                                                    style={{ color: "#fda035", }}
                                                />
                                            ))}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-gray-700 text-lg italic leading-relaxed">
                                            "{testimonial.text}"
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute -left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-110 transition"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute -right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-110 transition"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonials; 