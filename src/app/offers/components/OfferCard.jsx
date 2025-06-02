"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faUsers, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function OfferCard({ offer }) {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300"
        >
            <div className="relative h-48">
                {!imageError ? (
                    <Image
                        src={offer.image}
                        alt={`${offer.title} - Travel offer`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        onError={() => setImageError(true)}
                        priority={false}
                    />
                ) : (
                    <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-12 h-12 text-amber-700" />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {offer.prix} DA
                </div>
            </div>

            <div className="p-6">
                <h2 className="text-xl font-semibold text-amber-800 mb-4 line-clamp-1">{offer.title}</h2>

                <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-amber-700 mr-3" />
                        <div className="flex flex-wrap gap-2">
                            {offer.ville.map((ville, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-amber-100 text-amber-900 rounded-full text-sm"
                                >
                                    {ville}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 text-amber-700 mr-3" />
                        <span>{new Date(offer.date_de_depart).toLocaleDateString()}</span>
                    </div>

                    <div className={`flex items-center text-gray-600 ${offer.remaining_places >= 10 ? 'text-green-600' : 'text-red-600'}`}>
                        <FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-amber-700 mr-3 " />
                        <span>{offer.remaining_places} places remaining</span>
                    </div>
                </div>

                <Link
                    href={`/offers/${offer._id}`}
                    className="mt-6 block w-full bg-amber-700 text-white text-center py-3 rounded-xl hover:text-amber-700 hover:bg-transparent transition text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
} 