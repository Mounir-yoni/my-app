'use client';

import { useState, useEffect } from 'react';
import { getReservations } from '../../services/api';
import { FaCheck, FaTimes, FaPhone, FaUser, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaSearch, FaFilter, FaSync, FaInfoCircle, FaEnvelope, FaIdCard, FaHome, FaCity, FaBuilding } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://back-end-obur.onrender.com/api/v1';

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

const ReservationDetailsModal = ({ isOpen, onClose, reservation }) => {
  if (!isOpen || !reservation) return null;
  console.log(reservation);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Détails de la réservation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Flight Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Informations du voyage</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{reservation.voyage.destination}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Dates</p>
                  <p className="font-medium">
                    Du {new Date(reservation.voyage.date_de_depart).toLocaleDateString()}
                    au {new Date(reservation.voyage.date_de_retour).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Prix</p>
                  <p className="font-medium">{reservation.voyage.prix} €</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaUsers className="text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Places réservées</p>
                  <p className="font-medium">{reservation.numberOfPeople} personnes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaBuilding className="text-red-600" />
                <div>
                  <p className="text-sm text-gray-500">Villes visitées</p>
                  <p className="font-medium">{Array.isArray(reservation.voyage.ville) ? reservation.voyage.ville.join(', ') : reservation.voyage.ville}</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Informations du client</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Nom complet</p>
                  <p className="font-medium">{reservation.user.Firstname} {reservation.user.Lastname}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{reservation.user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{reservation.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaHome className="text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Adresse</p>
                  <p className="font-medium">{reservation.user.Adress}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaCity className="text-red-600" />
                <div>
                  <p className="text-sm text-gray-500">Ville</p>
                  <p className="font-medium">{reservation.user.ville}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Status */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statut de la réservation</h3>
          <div className="flex gap-4">
            <div>
              <p className="text-sm text-gray-500">Statut</p>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${reservation.status === 'confirmed' ? 'bg-green-500' :
                reservation.status === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                {reservation.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Paiement</p>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${reservation.paymentStatus === 'paid' ? 'bg-green-500' :
                reservation.paymentStatus === 'pending' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}>
                {reservation.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    keyword: '',
    dateFrom: '',
    dateTo: ''
  });

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create params object with only non-empty filters
      const params = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value && value.trim() !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      const data = await getReservations(params);
      setReservations(data.data || []);
      setRetryCount(0); // Reset retry count on successful fetch
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError(err.message || 'Failed to fetch reservations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchReservations();
  };

  const handleStatusUpdate = async (updates) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/reservations/${selectedReservation.id}`, updates, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchReservations();
      setIsModalOpen(false);
      setSelectedReservation(null);
      console.log('Status updated successfully'+updates);
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.response?.data?.message || err.message || 'Failed to update reservation status. Please try again.');
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
      keyword: '',
      dateFrom: '',
      dateTo: ''
    });
    fetchReservations();
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
          <span className="block sm:inline mb-4">{error}</span>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaSync className="animate-spin" />
            Réessayer
          </button>
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
                  name="keyword"
                  value={filters.keyword}
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
            key={reservation._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-100 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => {
              setSelectedReservation(reservation);
              setIsDetailsModalOpen(true);
            }}
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
                  onClick={(e) => {
                    e.stopPropagation();
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

      <ReservationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedReservation(null);
        }}
        reservation={selectedReservation}
      />
    </div>
  );
};

export default Reservations; 