'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaPhone, FaUser, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaSearch, FaFilter } from 'react-icons/fa';

const StatusModal = ({ isOpen, onClose, reservation, onUpdate }) => {
  const [status, setStatus] = useState(reservation?.status || '');
  const [paymentStatus, setPaymentStatus] = useState(reservation?.paymentStatus || '');

  useEffect(() => {
    if (reservation) {
      setStatus(reservation.status);
      setPaymentStatus(reservation.paymentStatus);
    }
  }, [reservation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      status,
      paymentStatus
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Modifier le statut</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut de la réservation</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut du paiement</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="pending">En attente</option>
              <option value="paid">Payé</option>
              <option value="refunded">Remboursé</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    fetchReservations();
  }, [filters]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Create params object with only non-empty filters
      const params = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value && value.trim() !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});
      console.log(params);
      const response = await axios.get('https://back-end-agence-de-voyage.onrender.com/api/v1/reservations', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      });
      setReservations(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reservations. Please try again later.');
      console.error('Error fetching reservations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (updates) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://back-end-agence-de-voyage.onrender.com/api/v1/reservations/${selectedReservation.id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchReservations();
      setIsModalOpen(false);
      setSelectedReservation(null);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReservations();
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      paymentStatus: '',
      search: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'refunded':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Réservations</h1>
        <div className="space-y-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Réservations</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Réservations</h1>

      {/* Filtration Bar */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Rechercher par nom, téléphone..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut du paiement</label>
              <select
                name="paymentStatus"
                value={filters.paymentStatus}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les paiements</option>
                <option value="pending">En attente</option>
                <option value="paid">Payé</option>
                <option value="refunded">Remboursé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <FaFilter />
              Réinitialiser
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaSearch />
              Rechercher
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {reservations.map((reservation, index) => (
          <div
            key={reservation.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Info Section */}
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">{reservation.voyage.title}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-blue-600" />
                    <span className="font-medium">{reservation.user.Firstname} {reservation.user.Lastname}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-green-600" />
                    <span className="font-medium">{reservation.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-2 text-purple-600" />
                    <span className="font-medium">{reservation.numberOfPeople} personnes</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-orange-500" />
                    <span className="font-medium">{reservation.voyage.date_de_depart}</span>
                  </div>
                </div>
              </div>

              {/* Status + Actions */}
              <div className="flex flex-col items-end gap-4 min-w-[250px]">
                <div className="flex gap-2 flex-wrap">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${getPaymentStatusColor(reservation.paymentStatus)}`}>
                    {reservation.paymentStatus}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedReservation(reservation);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <FaEdit />
                  Modifier le statut
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <StatusModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReservation(null);
        }}
        reservation={selectedReservation}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default Reservations; 