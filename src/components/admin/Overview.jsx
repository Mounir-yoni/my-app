'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaRoute, FaCalendarCheck, FaMoneyBillWave, FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';

const Overview = () => {
  const [stats, setStats] = useState({
    totalTrips: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeUsers: 0,
    totalOffers: 0,
    validatedOffers: 0,
    pendingOffers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('https://back-end-agence-de-voyage.onrender.com/api/v1/statistic', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch statistics. Please try again later.');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg p-4 sm:p-5 shadow-2xl flex items-center border-t-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]" style={{ borderTopColor: color }}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mr-3 sm:mr-4" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-xs sm:text-sm text-gray-500 truncate">{title}</h3>
        <p className="text-lg sm:text-2xl font-bold text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-3 sm:p-5">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-8">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 sm:p-5 shadow-2xl animate-pulse">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-200 mr-3 sm:mr-4"></div>
                <div className="flex-1">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mb-2"></div>
                  <div className="h-5 sm:h-6 bg-gray-200 rounded w-14 sm:w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 sm:p-5">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-8">Dashboard Overview</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <StatCard
          title="Total Trips"
          value={stats.voyageCount}
          icon={<FaRoute className="text-white text-lg sm:text-xl" />}
          color="#3498db"
        />
        <StatCard
          title="Total des réservations"
          value={stats.voyageCount}
          icon={<FaCalendarCheck className="text-white text-lg sm:text-xl" />}
          color="#2ecc71"
        />
        <StatCard
          title="Total Revenue"
          value={`${stats.totalRevenue} DA`}
          icon={<FaMoneyBillWave className="text-white text-lg sm:text-xl" />}
          color="#e74c3c"
        />
        <StatCard
          title="Active Users"
          value={stats.userCount}
          icon={<FaUsers className="text-white text-lg sm:text-xl" />}
          color="#f1c40f"
        />
        <StatCard
          title="Offres totales"
          value={stats.reservationCount}
          icon={<FaClipboardList className="text-white text-lg sm:text-xl" />}
          color="#9b59b6"
        />
        <StatCard
          title="Offres validées"
          value={stats.confirmedReservationCount}
          icon={<FaCheckCircle className="text-white text-lg sm:text-xl" />}
          color="#27ae60"
        />
        <StatCard
          title="En attente"
          value={stats.pendingReservationCount}
          icon={<FaClock className="text-white text-lg sm:text-xl" />}
          color="#e67e22"
        />
      </div>
    </div>
  );
};

export default Overview; 