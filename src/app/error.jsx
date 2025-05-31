'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}) {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-6xl font-bold text-amber-700 mb-4">Oops!</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Something went wrong</h2>
                    <p className="text-gray-600 mb-8">
                        We apologize for the inconvenience. Please try again later.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={reset}
                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 transition-colors duration-300"
                        >
                            Try Again
                        </button>
                        <Link
                            href="/"
                            className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
                        >
                            Return Home
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 