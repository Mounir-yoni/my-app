"use client"
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHotel, faUsers, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import island from '../image/island.png';
import Image from 'next/image';
const services = [
    {
        title: "Customized Tours",
        description: "Tailored travel experiences designed just for you",
        icon: faPlane
    },
    {
        title: "Luxury Accommodations",
        description: "Stay in the finest hotels and resorts worldwide",
        icon: faHotel
    },
    {
        title: "Group Tours",
        description: "Join our exciting group adventures",
        icon: faUsers
    },
    {
        title: "Travel Insurance",
        description: "Comprehensive coverage for worry-free travel",
        icon: faShieldAlt
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

const Services = () => {
    return (
        <motion.section
            className="py-20 bg-white relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl font-bold text-center text-dark-blue mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Our Services 🛎️
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                        >
                            <motion.div
                                className="text-amber-700 text-3xl mb-4"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <FontAwesomeIcon icon={service.icon} />
                            </motion.div>
                            <motion.h3
                                className="text-xl font-semibold text-dark-blue mb-2"
                                whileHover={{ color: "#B45309" }}
                            >
                                {service.title}
                            </motion.h3>
                            <motion.p
                                className="text-gray-600"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {service.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </motion.section>
    );
};

export default Services; 