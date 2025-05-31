"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faUsers, faMapMarkerAlt, faCheck, faArrowLeft, faTag } from "@fortawesome/free-solid-svg-icons";
import BookingForm from "../../../components/BookingForm";
import Link from "next/link";
import { useNotification } from "../../../context/NotificationContext";
import Image from "next/image";

const OfferDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const { showNotification } = useNotification();
    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);

    useEffect(() => {
        fetchOfferDetails();
    }, [id]);

    const fetchOfferDetails = async () => {
        try {
            // Try to get from cache first
            const cachedOffer = localStorage.getItem(`offer_${id}`);
            if (cachedOffer) {
                setOffer(JSON.parse(cachedOffer));
                setLoading(false);
            }

            const response = await axios.get(`http://localhost:8000/api/v1/voyages/${id}`);
            const offerData = response.data.data;
            setOffer(offerData);
            // Cache the offer data
            localStorage.setItem(`offer_${id}`, JSON.stringify(offerData));
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch offer details. Please try again later.');
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification('Please log in to book this offer', 'error');
            router.push('/auth');
            return;
        }
        setShowBookingForm(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    if (error || !offer) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    <p className="text-xl">{error}</p>
                    <button
                        onClick={fetchOfferDetails}
                        className="mt-4 px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    console.log(offer);
    return (
        <div className="min-h-screen from-amber-50 to-amber-100">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto pt-6 px-4">
                <Link
                    href="/offers"
                    className="inline-flex items-center text-amber-800 hover:text-amber-900 transition"
                    prefetch={true}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back to Offers
                </Link>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-1">
                {/* Main Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12">
                    {/* Left Column - Image */}
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src={`${offer.imageUrl}`}
                            alt={offer.title}
                            fill
                            className="object-cover"
                            priority
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 65vw"
                        />
                    </div>

                    {/* Right Column - Basic Info */}
                    <div className="flex flex-col justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-6 line-clamp-1">{offer.title}</h1>

                            <div className="space-y-6">
                                {/* Price */}
                                <div className="flex items-center text-gray-700">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                        <FontAwesomeIcon icon={faTag} className="w-6 h-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Price per person</p>
                                        <p className="text-2xl font-bold text-amber-700">{offer.prix} DA</p>
                                    </div>
                                </div>

                                {/* Destinations */}
                                <div className="flex items-start text-gray-700">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4 mt-1">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Destinations</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {offer.ville.map((city, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                                                >
                                                    {city}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-700">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                        <FontAwesomeIcon icon={faCalendar} className="w-6 h-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Departure Date</p>
                                        <p className="text-base  font-semibold text-gray-800">{new Date(offer.date_de_depart).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-700">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                        <FontAwesomeIcon icon={faClock} className="w-6 h-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="text-lg font-semibold text-gray-800">{offer.duree}</p>
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-700">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                        <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Available Seats</p>
                                        <p className={`text-lg font-medium ${offer.remaining_places > 5 ? 'text-green-600' : 'text-red-600'}`}>{offer.remaining_places} places</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleBookNow}
                            className="w-full mt-8 bg-amber-700 text-white py-4 rounded-xl hover:bg-amber-800 transition text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Reserver Maintenant✨
                        </button>
                    </div>
                </div>

                {/* Description Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-amber-800 mb-6">About this trip</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">{offer.description}</p>
                </div>

                {/* What's Included Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-amber-800 mb-6">What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-amber-700" />
                            </div>
                            <span className="font-medium">Professional Tour Guide</span>
                        </div>
                        <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-amber-700" />
                            </div>
                            <span className="font-medium">Comfortable Transportation</span>
                        </div>
                        <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-amber-700" />
                            </div>
                            <span className="font-medium">Hotel Accommodation</span>
                        </div>
                        <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-amber-700" />
                            </div>
                            <span className="font-medium">Daily Breakfast</span>
                        </div>
                        <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-amber-700" />
                            </div>
                            <span className="font-medium">Entrance Fees to Attractions</span>
                        </div>
                        <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faCheck} className="w-5 h-5 text-amber-700" />
                            </div>
                            <span className="font-medium">24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
                <BookingForm
                    offer={offer}
                    onClose={() => setShowBookingForm(false)}
                />
            )}
        </div>
    );
};

export default OfferDetails; 