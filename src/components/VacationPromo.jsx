'use client';

import Image from "next/image";
import vacationImage from "../image/parallax1.jpg";
import { motion } from "framer-motion";

const VacationPromo = () => {
  return (
    <section className="relative min-h-[200px] sm:min-h-[300px] md:min-h-[400px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={vacationImage}
          alt="Vacation Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-dark-blue/70"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-20 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          {/* Text Content */}
          <motion.div
            className="w-full md:w-2/3 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-amber-500 mb-2 sm:mb-4">
              Découvrez la magie de Türkiye avec nous
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-6 max-w-3xl mx-auto md:mx-0">
              Nous sommes des experts dans l'organisation des meilleurs voyages à Türkiye, de l'Istanbul historique aux plages pittoresques d'Antalya. Profitez d'une expérience unique qui comprend la résidence, les visites et les aventures inoubliables - tous à des prix compétitifs et un service distinctif.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-white/90 font-medium text-sm sm:text-base">
                From: <strong className="text-amber-400">algeria</strong>
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-amber-500">220000DA</span>
              <span className="text-white/90 text-sm sm:text-base">/ person</span>
            </div>
          </motion.div>

          {/* Button */}
          <motion.div
            className="w-full md:w-auto mt-4 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              DETAILS
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VacationPromo;
