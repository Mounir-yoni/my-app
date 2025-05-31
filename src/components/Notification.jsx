"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";

const Notification = ({ message, type = "success", onClose }) => {
    const getIcon = () => {
        switch (type) {
            case "success":
                return faCheck;
            case "error":
                return faExclamationTriangle;
            default:
                return faCheck;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case "success":
                return "bg-green-50 border-green-200";
            case "error":
                return "bg-red-50 border-red-200";
            default:
                return "bg-green-50 border-green-200";
        }
    };

    const getTextColor = () => {
        switch (type) {
            case "success":
                return "text-green-800";
            case "error":
                return "text-red-800";
            default:
                return "text-green-800";
        }
    };

    const getIconColor = () => {
        switch (type) {
            case "success":
                return "text-green-500";
            case "error":
                return "text-red-500";
            default:
                return "text-green-500";
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border w-full ${getBgColor()} max-w-md`}
            >
                <div className="flex items-start">
                    <div className={`flex-shrink-0 ${getIconColor()}`}>
                        <FontAwesomeIcon icon={getIcon()} className="w-5 h-5" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                        <p className={`text-sm font-medium ${getTextColor()}`}>
                            {message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            onClick={onClose}
                            className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${getTextColor()}`}
                        >
                            <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Notification; 