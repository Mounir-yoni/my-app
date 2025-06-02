'use client';

import { useState, useEffect } from 'react';
import { getStats } from '../../services/api';
import { FaUsers, FaRoute, FaCalendarCheck, FaMoneyBillWave, FaClipboardList, FaCheckCircle, FaClock, FaUserCheck } from 'react-icons/fa';

const Overview = () => {
  const [stats, setStats] = useState({
    voyageCount: 0,
    reservationCount: 0,
    userCount: 0,
    totalRevenue: 0,
    activeUserCount: 0,
    confirmedReservationCount: 0,
    pendingReservationCount: 0
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await getStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message || 'Failed to fetch statistics. Please try again.');
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={stats.userCount}
        icon={<FaUsers className="w-6 h-6 text-white" />}
        color="#3B82F6"
      />
      <StatCard
        title="Active Users"
        value={stats.activeUserCount}
        icon={<FaUserCheck className="w-6 h-6 text-white" />}
        color="#10B981"
      />
      <StatCard
        title="Total Trips"
        value={stats.voyageCount}
        icon={<FaRoute className="w-6 h-6 text-white" />}
        color="#F59E0B"
      />
      <StatCard
        title="Total Reservations"
        value={stats.reservationCount}
        icon={<FaCalendarCheck className="w-6 h-6 text-white" />}
        color="#8B5CF6"
      />
      <StatCard
        title="Confirmed Reservations"
        value={stats.confirmedReservationCount}
        icon={<FaCheckCircle className="w-6 h-6 text-white" />}
        color="#059669"
      />
      <StatCard
        title="Pending Reservations"
        value={stats.pendingReservationCount}
        icon={<FaClock className="w-6 h-6 text-white" />}
        color="#D97706"
      />
      <StatCard
        title="Total Revenue"
        value={`${stats.totalRevenue} DA`}
        icon={<FaMoneyBillWave className="w-6 h-6 text-white" />}
        color="#DC2626"
      />
    </div>
  );
};

export default Overview; 