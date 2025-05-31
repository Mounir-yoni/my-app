"use client";

import React, { useState, useEffect } from "react";
import PersonalInfo from "./components/PersonalInfo";
import Security from "./components/Security";
import BookedFlights from "./components/BookedFlights";
import { getLocalStorage } from '../../utils/storage';
import { useRouter } from "next/navigation";

const Profile = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("personal");

    useEffect(() => {
        if (!getLocalStorage("token")) {
            router.push('/auth');
        }
    }, [router]);

    const renderContent = () => {
        switch (activeTab) {
            case "personal":
                return <PersonalInfo />;
            case "security":
                return <Security />;
            case "flights":
                return <BookedFlights />;
            default:
                return <PersonalInfo />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-amber-800 mb-8">Mon Profil</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Menu */}
                    <div className="w-full md:w-64 bg-white rounded-xl shadow-lg p-4">
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "personal"
                                    ? "bg-amber-100 text-amber-800 font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    Informations Personnelles
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveTab("security")}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "security"
                                    ? "bg-amber-100 text-amber-800 font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    Sécurité
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveTab("flights")}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === "flights"
                                    ? "bg-amber-100 text-amber-800 font-medium"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    Mes Vols Réservés
                                </span>
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 