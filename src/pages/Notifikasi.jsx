import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotificationIcon = ({ color, children }) => (
  <div className="relative">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
      {children}
    </div>
    <div className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"></div>
  </div>
);

const NotificationItem = ({ id, icon, title, message, time, bgColor, textColor }) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    // Navigasi ke halaman detail notifikasi berdasarkan ID
    navigate(`/notifikasi/${id}`);
  };

  return (
    <div 
      onClick={handleNotificationClick}
      className={`flex items-center p-4 ${bgColor} rounded-lg hover:${bgColor.replace('50', '100')} transition cursor-pointer`}
    >
      {icon}
      <div className="ml-4">
        <p className={`font-semibold ${textColor}`}>
          {title} <span className="text-gray-500 text-sm">{time}</span>
        </p>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
};

const Notifikasi = () => {
  // Data notifikasi bisa diambil dari state management atau API
  const notifications = [
    {
      id: 1,
      type: 'reservasi',
      icon: (
        <NotificationIcon color="bg-blue-100">
          <i className="fas fa-calendar text-xl text-blue-600"></i>
        </NotificationIcon>
      ),
      title: "Halo, Sarazel!",
      message: "Reservasi Anda untuk LAB...",
      time: "3m",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: 2,
      type: 'pemeliharaan',
      icon: (
        <NotificationIcon color="bg-yellow-100">
          <i className="fas fa-tools text-xl text-yellow-600"></i>
        </NotificationIcon>
      ),
      title: "Pemberitahuan Pemeliharaan",
      message: "Jadwal pemeliharaan untuk alat XYZ...",
      time: "10m",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    },
    {
      id: 3,
      type: 'laporan',
      icon: (
        <NotificationIcon color="bg-green-100">
          <i className="fas fa-check-circle text-xl text-green-600"></i>
        </NotificationIcon>
      ),
      title: "Laporan Diterima",
      message: "Laporan kerusakan alat ABC telah diterima...",
      time: "1h",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    }
  ];

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Notifikasi</h1>
          <div className="w-6"></div>
        </header>
        
        <main className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                icon={notification.icon}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                bgColor={notification.bgColor}
                textColor={notification.textColor}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifikasi;