'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChartBar, FaCalendarAlt, FaPlus, FaList, FaUserPlus, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import Overview from '../../components/admin/Overview.jsx';
import Reservations from '../../components/admin/Reservations.jsx';
import CreateTrip from '../../components/admin/CreateTrip.jsx';
import ExistingTrips from '../../components/admin/ExistingTrips.jsx';
import CreateAdmin from '../../components/admin/CreateAdmin.jsx';

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(event.target) && !event.target.closest('#sidebar-toggle')) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <FaChartBar /> },
    { id: 'reservations', label: 'Reservations', icon: <FaCalendarAlt /> },
    { id: 'create-trip', label: 'Create Trip', icon: <FaPlus /> },
    { id: 'trips', label: 'Existing Trips', icon: <FaList /> },
    { id: 'create-admin', label: 'Create Admin', icon: <FaUserPlus /> },
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'overview':
        return <Overview />;
      case 'reservations':
        return <Reservations />;
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

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {/* Mobile Sidebar Toggle Button */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-20 left-4 z-50 p-2 rounded-lg bg-[#2c3e50] text-white md:hidden"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-64 mt-6 bg-[#2c3e50] text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveComponent(item.id);
                    if (window.innerWidth < 768) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeComponent === item.id
                    ? 'bg-white text-[#2c3e50]'
                    : 'text-white hover:bg-white/10'
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6">
        {renderComponent()}
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 