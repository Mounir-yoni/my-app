'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye, FaTimes, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const ExistingTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTrip, setEditingTrip] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loadingTrip, setLoadingTrip] = useState(false);
    const router = useRouter();

    // Monitor editingTrip changes
    useEffect(() => {
        if (editingTrip) {
            console.log('Editing trip updated:', editingTrip);
        }
    }, [editingTrip]);

    // Fetch all trips
    const fetchTrips = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/v1/voyages', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTrips(response.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch trips');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    // Handle trip deletion
    const handleDelete = async (tripId) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/v1/voyages/${tripId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTrips(trips.filter(trip => trip._id !== tripId));
            } catch (err) {
                setError('Failed to delete trip');
            }
        }
    };

    // Handle trip edit
    const handleEdit = async (tripId) => {
        setLoadingTrip(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/v1/voyages/${tripId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const trip = response.data;

            // Safely format dates
            const formatDate = (dateString) => {
                if (!dateString) return '';
                return dateString.includes('T') ? dateString.split('T')[0] : dateString;
            };

            const formattedTrip = {
                ...trip,
                date_de_depart: formatDate(trip.date_de_depart),
                date_de_retour: formatDate(trip.date_de_retour),
                ville: Array.isArray(trip.ville) ? trip.ville : trip.ville ? [trip.ville] : []
            };

            setEditingTrip(formattedTrip.data);
        } catch (err) {
            console.error('Error fetching trip:', err);
            setError('Failed to fetch trip details');
        } finally {
            setLoadingTrip(false);
        }
    };

    // Handle trip view
    const handleView = (tripId) => {
        router.push(`/offers/${tripId}`);
    };

    // Handle form changes
    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setEditingTrip(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else if (name === 'ville') {
            const villes = value.split(',').map(v => v.trim()).filter(v => v !== '');
            setEditingTrip(prev => ({
                ...prev,
                [name]: villes
            }));
        } else {
            setEditingTrip(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const jsonData = {
                ...editingTrip,
                remaining_places: editingTrip.remaining_places || editingTrip.nombre_de_personne
            };

            // Only convert image if it's a File object
            if (editingTrip.image instanceof File) {
                jsonData.image = await convertToBase64(editingTrip.image);
            }

            // Remove the File object from jsonData
            delete jsonData.image;

            console.log('Submitting trip data:', jsonData);
            console.log(editingTrip._id);
            await axios.put(`http://localhost:8000/api/v1/voyages/${editingTrip._id}`, jsonData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Update the trips list with the edited trip
            setTrips(trips.map(trip =>
                trip._id === editingTrip._id ? { ...editingTrip } : trip
            ));

            setEditingTrip(null);
        } catch (err) {
            console.error('Error updating trip:', err);
            setError(err.response?.data?.message || 'Failed to update trip');
        } finally {
            setSaving(false);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-2 sm:p-4 md:p-6 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Existing Trips
                </h1>
                <button
                    onClick={() => router.push('/admin/trips/create')}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                    <FaPlus className="w-4 h-4" />
                    <span className="whitespace-nowrap">Create New Trip</span>
                </button>
            </div>

            {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 text-red-700 rounded-lg animate-fade-in border border-red-200 text-sm sm:text-base">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Destination
                                        </th>
                                        <th scope="col" className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dates
                                        </th>
                                        <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Places
                                        </th>
                                        <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {trips.map((trip) => (
                                        <tr key={trip._id} className="hover:bg-gray-50 transition-colors duration-200">
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{trip.title}</div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{trip.destination}</div>
                                                <div className="text-xs sm:text-sm text-gray-500">{trip.ville.join(', ')}</div>
                                            </td>
                                            <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(trip.date_de_depart).toLocaleDateString()} - {new Date(trip.date_de_retour).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-blue-600">{trip.prix} MAD</div>
                                            </td>
                                            <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {trip.nombre_de_personne_reserve}/{trip.nombre_de_personne}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2 sm:space-x-3">
                                                    <button
                                                        onClick={() => handleView(trip._id)}
                                                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200 transform hover:scale-110"
                                                        title="View Trip"
                                                    >
                                                        <FaEye className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(trip._id)}
                                                        className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200 transform hover:scale-110"
                                                        title="Edit Trip"
                                                    >
                                                        <FaEdit className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(trip._id)}
                                                        className="text-red-600 hover:text-red-900 transition-colors duration-200 transform hover:scale-110"
                                                        title="Delete Trip"
                                                    >
                                                        <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editingTrip && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-2 sm:p-4">
                    <div className="bg-white rounded-xl p-3 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-slide-up">
                        <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Edit Trip
                            </h2>
                            <button
                                onClick={() => setEditingTrip(null)}
                                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 transform hover:scale-110"
                            >
                                <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {loadingTrip ? (
                            <div className="flex justify-center items-center py-8 sm:py-12">
                                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={editingTrip.title || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={editingTrip.description || ''}
                                            onChange={handleFormChange}
                                            rows="4"
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                                        <input
                                            type="text"
                                            name="destination"
                                            value={editingTrip.destination || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City (comma-separated)</label>
                                        <input
                                            type="text"
                                            name="ville"
                                            value={Array.isArray(editingTrip.ville) ? editingTrip.ville.join(', ') : editingTrip.ville || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                        <input
                                            type="text"
                                            name="pays"
                                            value={editingTrip.pays || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                                        <input
                                            type="number"
                                            name="duree"
                                            value={editingTrip.duree || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                            min="1"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                                        <input
                                            type="date"
                                            name="date_de_depart"
                                            value={editingTrip.date_de_depart || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                                        <input
                                            type="date"
                                            name="date_de_retour"
                                            value={editingTrip.date_de_retour || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (MAD)</label>
                                        <input
                                            type="number"
                                            name="prix"
                                            value={editingTrip.prix || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                            min="0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Places</label>
                                        <input
                                            type="number"
                                            name="nombre_de_personne"
                                            value={editingTrip.nombre_de_personne || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                            min="1"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Places</label>
                                        <input
                                            type="number"
                                            name="remaining_places"
                                            value={editingTrip.remaining_places || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                            min="0"
                                            max={editingTrip.nombre_de_personne}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Number Reserved</label>
                                        <input
                                            type="number"
                                            name="nombre_de_personne_reserve"
                                            value={editingTrip.nombre_de_personne_reserve || ''}
                                            onChange={handleFormChange}
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                            required
                                            min="0"
                                        />
                                    </div>

                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Image (Optional)</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleFormChange}
                                            accept="image/*"
                                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setEditingTrip(null)}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {saving ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-slide-up {
                    animation: slideUp 0.3s ease-out;
                }

                /* Custom scrollbar for better mobile experience */
                .overflow-y-auto {
                    scrollbar-width: thin;
                    scrollbar-color: #CBD5E0 #EDF2F7;
                }

                .overflow-y-auto::-webkit-scrollbar {
                    width: 6px;
                }

                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #EDF2F7;
                }

                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background-color: #CBD5E0;
                    border-radius: 3px;
                }
            `}</style>
        </div>
    );
};

export default ExistingTrips; 