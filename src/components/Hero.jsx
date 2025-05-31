"use client"
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import image from '../image/hero-bg-GIXPzdj7.jpg'

const Hero = () => {
    return (
        <div className="relative h-[80vh] max-w-7xl mx-auto">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt="Travel Background"
                    fill
                    className="object-cover rounded-3xl"
                    priority
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl" />

            {/* Content */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-white p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Discover Your Next Adventure
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-center mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Experience unforgettable journeys with our expert travel services
                </motion.p>
                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <Link
                        href="/contact"
                        className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                        Contact Us
                    </Link>
                    <Link
                        href="/offers"
                        className="bg-transparent border-2 border-white hover:bg-white hover:text-dark-blue text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                        View Offers
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero; 