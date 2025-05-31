"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLocalStorage, getParsedLocalStorage, setLocalStorage } from '../../../utils/storage';
import { useRouter } from 'next/navigation';

const PersonalInfo = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        Adress: '',
        ville: '',
        postalCode: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const userinfo = getParsedLocalStorage("user");
        if (!userinfo) {
            router.push('/auth');
            return;
        }

        setFormData({
            firstName: userinfo.Firstname || '',
            lastName: userinfo.Lastname || '',
            email: userinfo.email || '',
            phone: userinfo.phone || '',
            Adress: userinfo.Adress || '',
            ville: userinfo.city || '',
            postalCode: userinfo.postalCode || '',
        });
        setLoading(false);
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear messages when user starts typing
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");
        setSuccess("");

        try {
            const token = getLocalStorage("token");
            if (!token) {
                router.push('/auth');
                return;
            }

            const response = await axios.put(
                `https://back-end-agence-de-voyage.onrender.com/api/v1/users/updateme`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                // Update local storage with new user info
                const updatedUser = {
                    ...getParsedLocalStorage("user"),
                    Firstname: formData.firstName,
                    Lastname: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    Adress: formData.Adress,
                    city: formData.ville,
                    postalCode: formData.postalCode
                };
                setLocalStorage("user", JSON.stringify(updatedUser));

                setSuccess("Informations mises à jour avec succès");
                setIsEditing(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue lors de la mise à jour des informations");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Informations Personnelles</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Modifier
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prénom
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nom
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Téléphone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Adresse
                        </label>
                        <input
                            type="text"
                            name="Adress"
                            value={formData.Adress}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ville
                        </label>
                        <input
                            type="text"
                            name="ville"
                            value={formData.ville}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Code Postal
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                        >
                            {isSaving ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PersonalInfo; 