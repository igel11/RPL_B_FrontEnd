import React from 'react';
import { Link, useParams } from 'react-router-dom';

const DetailNotifikasi = () => {
  const { id } = useParams();

  // Logika untuk mengambil detail notifikasi berdasarkan ID
  const getNotificationDetails = (id) => {
    // Contoh data statis, biasanya akan diambil dari API atau state management
    const notifications = {
      1: {
        title: "Reservasi LAB",
        content: "Detail lengkap reservasi LAB Anda...",
        date: "20 Juni 2023",
        time: "14:30 WIB"
      },
      2: {
        title: "Pemeliharaan Alat XYZ",
        content: "Rincian jadwal dan informasi pemeliharaan alat XYZ...",
        date: "21 Juni 2023",
        time: "09:00 WIB"
      },
      3: {
        title: "Laporan Kerusakan Alat",
        content: "Status dan tindak lanjut laporan kerusakan alat ABC...",
        date: "22 Juni 2023",
        time: "11:45 WIB"
      }
    };

    return notifications[id] || null;
  };

  const notification = getNotificationDetails(id);

  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Notifikasi tidak ditemukan</p>
        <Link to="/notifikasi" className="mt-4 text-blue-500">Kembali ke Notifikasi</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl">
          <Link to="/notifikasi" className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Detail Notifikasi</h1>
          <div className="w-6"></div>
        </header>
        
        <main className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{notification.title}</h2>
            <div className="text-gray-600 mb-4">
              <p>Tanggal: {notification.date}</p>
              <p>Waktu: {notification.time}</p>
            </div>
            <p className="text-gray-800">{notification.content}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailNotifikasi;