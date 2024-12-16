import React, { useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

useEffect(() => {
  const socket = io("http://localhost:3500"); // Menghubungkan ke server Socket.IO backend

  socket.on("updateLabItems", (data) => {
    // Tangani pembaruan data real-time di sini
    console.log("Lab items diperbarui:", data);
    setLabItems(data); // Perbarui state atau lakukan aksi lainnya
  });

  return () => {
    socket.disconnect(); // Bersihkan koneksi saat komponen unmount
  };
}, []);

const Monitoring = () => {
  const [selectedLab, setSelectedLab] = useState("Cyber");

  const labs = ["Cyber", "TBD", "Mulmed", "RPL"];

  const items = {
    Cyber: [
      {
        name: "Komputer",
        icon: "🖥️",
        total: 10,
        tersedia: 8,
        rusak: 1,
        perbaikan: 1,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        name: "Keyboard",
        icon: "⌨️",
        total: 15,
        tersedia: 12,
        rusak: 2,
        perbaikan: 1,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
      {
        name: "Mouse",
        icon: "🖱️",
        total: 20,
        tersedia: 15,
        rusak: 3,
        perbaikan: 2,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        name: "Printer 3D",
        icon: "🖨️",
        total: 5,
        tersedia: 4,
        rusak: 1,
        perbaikan: 0,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
    ],
    TBD: [
      {
        name: "Komputer",
        icon: "🖥️",
        total: 15,
        tersedia: 10,
        rusak: 2,
        perbaikan: 2,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        name: "Keyboard",
        icon: "⌨️",
        total: 15,
        tersedia: 12,
        rusak: 2,
        perbaikan: 1,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
      {
        name: "Mouse",
        icon: "🖱️",
        total: 20,
        tersedia: 15,
        rusak: 3,
        perbaikan: 2,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        name: "Printer 3D",
        icon: "🖨️",
        total: 5,
        tersedia: 4,
        rusak: 1,
        perbaikan: 0,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
    ],
    Mulmed: [
      {
        name: "Komputer",
        icon: "🖥️",
        total: 10,
        tersedia: 8,
        rusak: 1,
        perbaikan: 1,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        name: "Keyboard",
        icon: "⌨️",
        total: 15,
        tersedia: 12,
        rusak: 2,
        perbaikan: 1,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
      {
        name: "Mouse",
        icon: "🖱️",
        total: 20,
        tersedia: 15,
        rusak: 3,
        perbaikan: 2,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        name: "Printer 3D",
        icon: "🖨️",
        total: 5,
        tersedia: 4,
        rusak: 1,
        perbaikan: 0,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
    ],
    RPL: [
      {
        name: "Komputer",
        icon: "🖥️",
        total: 20,
        tersedia: 13,
        rusak: 5,
        perbaikan: 2,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        name: "Keyboard",
        icon: "⌨️",
        total: 20,
        tersedia: 16,
        rusak: 3,
        perbaikan: 1,
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
      },
      {
        name: "Mouse",
        icon: "🖱️",
        total: 20,
        tersedia: 14,
        rusak: 3,
        perbaikan: 3,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        name: "Printer 3D",
        icon: "🖨️",
        total: 3,
        tersedia: 1,
        rusak: 1,
        perbaikan: 1,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
    ],
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl mb-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Monitoring Laboratorium
          </h1>
          <div className="w-6"></div>
        </header>

        {/* Lab Selection Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Pilih Laboratorium
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {labs.map((lab) => (
              <button
                key={lab}
                className={`
                                    p-4 rounded-lg transition text-left 
                                    ${
                                      selectedLab === lab
                                        ? "bg-black text-white"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    }`}
                onClick={() => setSelectedLab(lab)}
              >
                {lab}
              </button>
            ))}
          </div>
        </div>

        {/* Lab Items List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Daftar Alat Laboratorium {selectedLab}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items[selectedLab].map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 p-4 rounded-lg"
              >
                <div className={`mr-4 ${item.iconBg} p-3 rounded-full`}>
                  <span className={`text-2xl ${item.iconColor}`}>
                    {item.icon}
                  </span>
                </div>
                <div className="flex-grow">
                  <p className="text-base font-medium">{item.name}</p>
                  <div className="flex space-x-2 mt-1">
                    <span className="text-green-600 text-sm">
                      Tersedia: {item.tersedia}
                    </span>
                    <span className="text-red-600 text-sm">
                      Rusak: {item.rusak}
                    </span>
                    <span className="text-yellow-600 text-sm">
                      Perbaikan: {item.perbaikan}
                    </span>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">
                  Total: {item.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reservasi Button */}
        <div className="w-full">
          <Link
            to="/reservasi"
            className="w-full block text-center bg-black text-white py-3 rounded-full hover:bg-gray-800 transition duration-300 shadow-md"
          >
            Ajukan Reservasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
