"use client";

import React, { useState } from "react";
import axios from "axios";

const Security = () => {

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        setError("");
        setSuccess("");

        // Validate passwords
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        if (formData.newPassword.length < 8) {
            setError("Le nouveau mot de passe doit contenir au moins 8 caractères");
            return;
        }

        setIsSaving(true);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8000/api/v1/users/updatepassword`,
                {
                    currentPassword: formData.currentPassword,
                    password: formData.newPassword,
                    confirmPassword: formData.confirmPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data) {
                // Clear form
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

                setSuccess("Mot de passe modifié avec succès");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Une erreur est survenue lors de la modification du mot de passe");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sécurité</h2>

            <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                        {success}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe actuel
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? "Modification en cours..." : "Modifier le mot de passe"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Security; 