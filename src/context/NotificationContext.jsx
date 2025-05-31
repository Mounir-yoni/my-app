"use client";
import { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        // Auto hide after 5 seconds
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const hideNotification = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={hideNotification}
                />
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
}; 