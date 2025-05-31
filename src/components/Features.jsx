"use client"
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHotel, faMapMarkedAlt, faHeadset } from '@fortawesome/free-solid-svg-icons';
import img from '../image/airplane.png';
import Image from 'next/image'

const features = [
    {
        title: "Flight Booking",
        description: "Find the best deals on flights worldwide",
        icon: faPlane
    },
    {
        title: "Hotel Reservations",
        description: "Book comfortable accommodations anywhere",
        icon: faHotel
    },
    {
        title: "Travel Packages",
        description: "All-inclusive travel packages for every budget",
        icon: faMapMarkedAlt
    },
    {
        title: "24/7 Support",
        description: "Round-the-clock customer service",
        icon: faHeadset
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-gray-50 relative">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark-blue"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Why Choose Us ✅
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            style={{ zIndex: 2 }}
                        >
                            <div className="text-amber-700 text-3xl mb-4">
                                <FontAwesomeIcon icon={feature.icon} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-dark-blue">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Image
                src={img}
                alt="Travel Background"
                width={150}
                height={100}
                className='airplane-Home'
                priority
            />
        </section>
    );
};

export default Features; 