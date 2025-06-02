'use client';

import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://back-end-obur.onrender.com/api/v1';

const CreateTrip = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        prix: '',
        date_de_depart: '',
        date_de_retour: '',
        duree: '',
        destination: '',
        image: null,
        ville: '',
        pays: '',
        nombre_de_personne: '',
        nombre_de_personne_reserve: '',
        remaining_places: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm(f => ({ ...f, image: files[0] }));
        } else if (name === 'ville') {
            // Convert comma-separated string to array
            const villes = value.split(',').map(v => v.trim()).filter(v => v);
            setForm(f => ({ ...f, ville: villes }));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            // Basic validation
            for (const key of Object.keys(form)) {
                if (!form[key] || (key === 'image' && !(form.image instanceof File))) {
                    throw new Error('Please fill all fields and select an image.');
                }
            }
            // Prepare FormData
            const data = new FormData();
            Object.entries(form).forEach(([k, v]) => {
                if (k === 'ville') {
                    // Append each ville as a separate entry
                    v.forEach(ville => data.append('ville[]', ville));
                } else {
                    data.append(k, v);
                }
            });
            // API call
            await axios.post(`${API_URL}/voyages`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4M2FkNzUzZWFhM2VkZTM3YjM2NDQyNyIsImlhdCI6MTc0ODcyNjM0MiwiZXhwIjoxNzU2NTAyMzQyfQ.0ni22EsDV43a3A8AnptkkB4gSziNSUcZO4LBtTRKoZs`
                }
            });
            setSuccess('Trip created successfully!');
            setForm({
                title: '', description: '', prix: '', date_de_depart: '', date_de_retour: '', duree: '', destination: '', image: null, ville: '', pays: '', nombre_de_personne: '', nombre_de_personne_reserve: '', remaining_places: ''
            });
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || err.message || 'Failed to create trip.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Trip</h2>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="prix" value={form.prix} onChange={handleChange} placeholder="Price" type="number" min="0" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="date_de_depart" value={form.date_de_depart} onChange={handleChange} type="date" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="date_de_retour" value={form.date_de_retour} onChange={handleChange} type="date" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="duree" value={form.duree} onChange={handleChange} placeholder="Duration (days)" type="number" min="1" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="destination" value={form.destination} onChange={handleChange} placeholder="Destination" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="image" type="file" accept="image/*" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="ville" value={Array.isArray(form.ville) ? form.ville.join(', ') : form.ville} onChange={handleChange} placeholder="Cities (comma-separated)" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="pays" value={form.pays} onChange={handleChange} placeholder="Country" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="nombre_de_personne" value={form.nombre_de_personne} onChange={handleChange} placeholder="Total Places" type="number" min="1" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="nombre_de_personne_reserve" value={form.nombre_de_personne_reserve} onChange={handleChange} placeholder="Reserved Places" type="number" min="0" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input name="remaining_places" value={form.remaining_places} onChange={handleChange} placeholder="Remaining Places" type="number" min="0" required className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50">
                    {loading ? 'Creating...' : 'Create Trip'}
                </button>
            </form>
        </div>
    );
};

export default CreateTrip;
