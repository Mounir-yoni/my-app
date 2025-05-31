'use client';

import { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';

const CreateTrip = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        destination: '',
        date_de_depart: '',
        date_de_retour: '',
        duree: '',
        prix: '',
        ville: '',
        pays: '',
        nombre_de_personne: '',
        remaining_places: '',
        nombre_de_personne_reserve: 0,
        image: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else if (name === 'ville') {
            // Split the input value by commas and trim whitespace
            const villes = value.split(',').map(v => v.trim()).filter(v => v !== '');
            setFormData(prev => ({
                ...prev,
                [name]: villes
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            // Create FormData object
            const formDataToSend = new FormData();

            // Append all form fields to FormData
            Object.keys(formData).forEach(key => {
                if (key === 'ville') {
                    // Handle array of cities
                    formData.ville.forEach(city => {
                        formDataToSend.append('ville[]', city);
                    });
                } else if (key === 'image' && formData.image) {
                    // Handle image file
                    formDataToSend.append('image', formData.image);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Set remaining places if not specified
            if (!formData.remaining_places) {
                formDataToSend.set('remaining_places', formData.nombre_de_personne);
            }

            const response = await axios.post('http://localhost:8000/api/v1/voyages', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);

            setSuccess(true);
            setFormData({
                title: '',
                description: '',
                destination: '',
                date_de_depart: '',
                date_de_retour: '',
                duree: '',
                prix: '',
                ville: [''],
                pays: '',
                nombre_de_personne: '',
                remaining_places: '',
                nombre_de_personne_reserve: 0,
                image: null
            });

            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Error details:', err);
            setError(err.response?.data?.message || 'Failed to create trip. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2 sm:p-4 md:p-6 max-w-4xl mx-auto transition-all duration-300">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Create New Trip
            </h1>

            {success && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl animate-fade-in">
                    Trip created successfully!
                </div>
            )}

            {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl animate-fade-in">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6 border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 transition-all duration-300 hover:shadow-xl">
                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Trip Title"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                            rows="4"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            placeholder="Destination"
                            required
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City (comma-separated)</label>
                        <input
                            type="text"
                            name="ville"
                            value={Array.isArray(formData.ville) ? formData.ville.join(', ') : formData.ville}
                            onChange={handleChange}
                            placeholder="Enter cities separated by commas"
                            required
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                            type="text"
                            name="pays"
                            value={formData.pays}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                        <input
                            type="number"
                            name="duree"
                            value={formData.duree}
                            onChange={handleChange}
                            placeholder="Duration"
                            required
                            min="1"
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                        <input
                            type="date"
                            name="date_de_depart"
                            value={formData.date_de_depart}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                        <input
                            type="date"
                            name="date_de_retour"
                            value={formData.date_de_retour}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">prix (MAD)</label>
                        <input
                            type="number"
                            name="prix"
                            value={formData.prix}
                            onChange={handleChange}
                            placeholder="prix"
                            required
                            min="0"
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Places</label>
                        <input
                            type="number"
                            name="nombre_de_personne"
                            value={formData.nombre_de_personne}
                            onChange={handleChange}
                            placeholder="Total Places"
                            required
                            min="1"
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Places</label>
                        <input
                            type="number"
                            name="remaining_places"
                            value={formData.remaining_places}
                            onChange={handleChange}
                            placeholder="Remaining Places"
                            required
                            min="0"
                            max={formData.nombre_de_personne || undefined}
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number Reserved</label>
                        <input
                            type="number"
                            name="nombre_de_personne_reserve"
                            value={formData.nombre_de_personne_reserve}
                            onChange={handleChange}
                            placeholder="Number Reserved"
                            required
                            min="0"
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <FaPlus className="w-4 h-4" />
                                <span>Create Trip</span>
                            </>
                        )}
                    </button>
                </div>
            </form>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
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

export default CreateTrip;
