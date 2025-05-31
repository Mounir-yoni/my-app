"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function AboutContent() {
    return (
        <>
            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                        <span className="text-3xl">🌍</span> Qui sommes-nous ?
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Depuis plus de <strong>10 ans</strong>, <strong>Travel Agency</strong> vous accompagne dans la découverte du monde à travers des <strong>voyages internationaux</strong> soigneusement organisés.
                        Notre passion ? Créer pour vous des expériences inoubliables, authentiques et riches en émotions.
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                        <span className="text-3xl">🎯</span> Notre mission
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Offrir à nos clients des voyages de qualité, sur mesure et adaptés à tous les budgets,
                        tout en garantissant un accompagnement professionnel à chaque étape de leur aventure.
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                        <span className="text-3xl">👁️</span> Notre vision
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Devenir une référence incontournable dans le domaine du tourisme international en proposant
                        des services innovants, sécurisés et centrés sur la satisfaction totale de nos clients.
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                        <span className="text-3xl">💡</span> Nos valeurs
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <strong>Professionnalisme</strong> – Une équipe qualifiée et expérimentée à votre écoute.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <strong>Confiance</strong> – Transparence, sécurité et respect des engagements.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <strong>Satisfaction client</strong> – Vos attentes sont notre priorité.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <strong>Innovation</strong> – Des idées nouvelles pour des voyages uniques.
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <strong>Accessibilité</strong> – Des solutions pour tous les profils et tous les budgets.
                        </li>
                    </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                        <span className="text-3xl">🧳</span> Nos services
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Organisation de voyages internationaux
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Circuits sur mesure
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Réservations d'hôtels et billets d'avion
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Assistance visa et formalités administratives
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            Accompagnement touristique personnalisé
                        </li>
                    </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <h2 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                        <span className="text-3xl">🧑‍🤝‍🧑</span> Notre équipe
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Notre force repose sur une équipe dynamique, passionnée de voyages et dévouée à vous offrir le meilleur.
                        De nos conseillers en agence à nos guides sur le terrain, nous partageons tous la même ambition :
                        faire de votre voyage un moment inoubliable.
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-16 bg-white rounded-2xl p-8 shadow-2xl"
            >
                <h3 className="text-2xl font-semibold mb-6">🚀 Prêt pour votre prochaine aventure ?</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/contact"
                        className="bg-amber-700 text-white py-3 px-8 rounded-lg shadow hover:bg-amber-800 transition"
                    >
                        Contactez-nous
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/offers"
                        className="bg-white border-2 border-amber-700 text-amber-700 py-3 px-8 rounded-lg shadow-2xl hover:bg-amber-50 transition"
                    >
                        Voir nos offres
                    </motion.a>
                </div>
            </motion.div>
        </>
    );
} 