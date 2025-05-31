import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaCalendarAlt, FaPlus, FaList, FaUserPlus, FaHome } from 'react-icons/fa';
import Overview from '../components/admin/Overview';
import Reservations from '../components/admin/Reservations';
import './Admin.css';

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState('overview');

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
        return <div>Create Trip Component (Coming Soon)</div>;
      case 'trips':
        return <div>Existing Trips Component (Coming Soon)</div>;
      case 'create-admin':
        return <div>Create Admin Component (Coming Soon)</div>;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${activeComponent === item.id ? 'active' : ''}`}
              onClick={() => setActiveComponent(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <Link to="/" className="menu-item home-link">
          <FaHome />
          <span>Return to Home</span>
        </Link>
      </div>
      <div className="admin-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Admin; 