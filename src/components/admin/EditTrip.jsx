'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaInfoCircle } from 'react-icons/fa';

const EditTrip = ({ tripId }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8000/api/v1/voyages/${tripId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const trip = response.data;
                setFormData({
                    ...trip,
                    date_de_depart: trip.date_de_depart.split('T')[0],
                    date_de_retour: trip.date_de_retour.split('T')[0],
                    ville: Array.isArray(trip.ville) ? trip.ville : [trip.ville]
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch trip details');
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else if (name === 'ville') {
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
        setSaving(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const jsonData = {
                ...formData,
                remaining_places: formData.remaining_places || formData.nombre_de_personne,
                image: formData.image ? await convertToBase64(formData.image) : undefined
            };

            // Remove the File object from jsonData
            delete jsonData.image;

            await axios.put(`http://localhost:8000/api/v1/voyages/${tripId}`, jsonData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/trips');
            }, 2000);
        } catch (err) {
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
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Trip</h1>

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                    Trip updated successfully! Redirecting...
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Trip Title"
                            required
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                            rows="4"
                            className="w-full border p-2 rounded-lg"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (MAD)</label>
                        <input
                            type="number"
                            name="prix"
                            value={formData.prix}
                            onChange={handleChange}
                            placeholder="Price"
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

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Image (Optional)</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            className="w-full border p-2 rounded-lg"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/trips')}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        {saving ? 'Saving...' : 'Save Changes'} <FaInfoCircle />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTrip; 