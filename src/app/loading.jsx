'use client';

import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 text-lg">Loading...</p>
            </motion.div>
        </div>
    );
} 