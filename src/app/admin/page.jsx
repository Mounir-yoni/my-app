'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaUsers, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes, FaChartBar, FaPlus, FaList, FaUserPlus } from 'react-icons/fa';
import Reservations from '../../components/admin/Reservations';
import Users from '../../components/admin/Users';
import Overview from '../../components/admin/Overview';
import CreateTrip from '../../components/admin/CreateTrip';
import ExistingTrips from '../../components/admin/ExistingTrips';
import CreateAdmin from '../../components/admin/CreateAdmin';

const AdminPage = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'reservations':
        return <Reservations />;
      case 'users':
        return <Users />;
      case 'create-trip':
        return <CreateTrip />;
      case 'trips':
        return <ExistingTrips />;
      case 'create-admin':
        return <CreateAdmin />;
      default:
        return <Overview />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Tableau de bord', icon: <FaChartBar /> },
    { id: 'reservations', label: 'Réservations', icon: <FaCalendarAlt /> },
    { id: 'users', label: 'Utilisateurs', icon: <FaUsers /> },
    { id: 'create-trip', label: 'Créer un voyage', icon: <FaPlus /> },
    { id: 'trips', label: 'Voyages existants', icon: <FaList /> },
    { id: 'create-admin', label: 'Créer un admin', icon: <FaUserPlus /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md lg:hidden"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:relative lg:block`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminPage; 