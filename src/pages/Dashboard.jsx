import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-900 to-black text-white p-6 shadow-2xl">
        <div className="mb-12 flex items-center space-x-3">
          <img src="https://placehold.co/50x50" className="rounded-full" alt="Logo" />
          <h1 className="text-xl font-bold">Lab TI UNSRAT</h1>
        </div>
        <nav>
          <ul className="space-y-4">
            <li className="group cursor-pointer sidebar-item">
              <div
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition"
                onClick={() => navigate('/Dashboard')}
              >
                <i className="fas fa-home text-xl group-hover:text-blue-400"></i>
                <span className="group-hover:text-blue-300">Dashboard</span>
              </div>
            </li>
            <li className="group cursor-pointer sidebar-item" onClick={() => navigate('/Absensi')}>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
                <i className="fas fa-qrcode text-xl group-hover:text-green-400"></i>
                <span className="group-hover:text-green-300">Absensi</span>
              </div>
            </li>
            <li className="group cursor-pointer sidebar-item" onClick={() => navigate('/Reservasi')}>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
                <i className="fas fa-calendar-alt text-xl group-hover:text-purple-400"></i>
                <span className="group-hover:text-purple-300">Reservasi</span>
              </div>
            </li>
            <li className="group cursor-pointer sidebar-item" onClick={() => navigate('/Laporan')}>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
                <i className="fas fa-exclamation-triangle text-xl group-hover:text-red-400"></i>
                <span className="group-hover:text-red-300">Laporan Kerusakan</span>
              </div>
            </li>
            <li className="group cursor-pointer sidebar-item" onClick={() => navigate('/Monitoring')}>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
                <i className="fas fa-desktop text-xl group-hover:text-yellow-400"></i>
                <span className="group-hover:text-yellow-300">Monitoring Alat</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <a href="notifikasi.html">
                <i className="fas fa-bell text-xl text-gray-600 hover:text-blue-600 cursor-pointer"></i>
              </a>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            </div>
            <div className="flex items-center space-x-3">
              <img src="https://placehold.co/40x40" className="rounded-full" alt="Profile" />
              <div>
                <p className="font-semibold">Sarazel</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Welcome Banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Welcome Back, Sarazel</h2>
            <p className="text-blue-100">Here's an overview of your lab management system</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 mb-2">Total Absensi</h3>
                  <p className="text-3xl font-bold text-blue-600">124</p>
                </div>
                <i className="fas fa-qrcode text-3xl text-blue-300"></i>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 mb-2">Reservasi</h3>
                  <p className="text-3xl font-bold text-green-600">42</p>
                </div>
                <i className="fas fa-calendar-alt text-3xl text-green-300"></i>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>No recent activities</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
