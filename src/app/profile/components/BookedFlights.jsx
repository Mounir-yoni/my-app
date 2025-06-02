"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlane,
    faCalendarAlt,
    faClock,
    faMapMarkerAlt,
    faUser,
    faTicketAlt,
    faSpinner,
    faChevronDown,
    faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { getLocalStorage } from '../../../utils/storage';

const BookedFlights = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedReservation, setExpandedReservation] = useState(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = getLocalStorage('token');
                if (!token) return;

                const response = await axios.get('https://back-end-obur.onrender.com/api/v1/reservations/my-reservations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setReservations(response.data.data || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching reservations:', err);
                setError('Failed to load reservations. Please try again later.');
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const toggleReservation = (id) => {
        setExpandedReservation(expandedReservation === id ? null : id);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <FontAwesomeIcon icon={faSpinner} className="w-12 h-12 text-amber-700 animate-spin mb-4" />
                <p className="text-gray-600">Chargement de vos réservations...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16 bg-red-50 rounded-xl">
                <FontAwesomeIcon icon={faTicketAlt} className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-red-700 mb-2">Erreur de chargement</h3>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
                <FontAwesomeIcon icon={faTicketAlt} className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-700 mb-3">Aucune réservation trouvée</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    Vous n'avez pas encore effectué de réservation de vol. Explorez nos offres et commencez à planifier votre prochain voyage !
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">Mes Vols Réservés</h2>
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {reservations.length} réservation(s)
                </span>
            </div>

            <div className="space-y-6">
                {reservations.map((reservation) => (
                    <motion.div
                        key={reservation._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faPlane} className="w-6 h-6 text-amber-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {reservation.voyage?.title || 'Flight Reservation'}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Réservé le {new Date(reservation.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(reservation.status)}`}>
                                        {reservation.status}
                                    </span>
                                    <button
                                        onClick={() => toggleReservation(reservation._id)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <FontAwesomeIcon
                                            icon={expandedReservation === reservation._id ? faChevronUp : faChevronDown}
                                            className="w-5 h-5 text-gray-600"
                                        />
                                    </button>
                                </div>
                            </div>

                            <motion.div
                                initial={false}
                                animate={{ height: expandedReservation === reservation._id ? 'auto' : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Date de départ</p>
                                            <p className="font-medium text-gray-800">
                                                {new Date(reservation.voyage?.date_de_depart).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                            <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Durée</p>
                                            <p className="font-medium text-gray-800">
                                                {reservation.voyage?.duree || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Destination</p>
                                            <p className="font-medium text-gray-800">
                                                {reservation.voyage?.pays || 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                                            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-amber-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Passagers</p>
                                            <p className="font-medium text-gray-800">
                                                {reservation.numberOfPeople || 1} personne(s)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Numéro de réservation</p>
                                            <p className="font-medium text-gray-800">{reservation._id}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Prix total</p>
                                            <p className="text-2xl font-bold text-amber-700">
                                                {reservation.totalPrice} DA
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BookedFlights; 