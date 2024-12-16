import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

// URL server backend
const SOCKET_URL = "http://localhost:3001"; // Sesuaikan dengan alamat backend Anda

const Monitoring = () => {
  const [selectedLab, setSelectedLab] = useState("Cyber");
  const [items, setItems] = useState({
    Cyber: [],
    TBD: [],
    Mulmed: [],
    RPL: [],
  });

  const labs = ["Cyber", "TBD", "Mulmed", "RPL"];

  // Menghubungkan ke socket server
  useEffect(() => {
    const socket = io(SOCKET_URL);

    // Mendengarkan event 'updateLabItems' dari server
    socket.on("updateLabItems", (updatedData) => {
      // Perbarui data lab item sesuai dengan yang diterima dari server
      setItems((prevItems) => ({
        ...prevItems,
        [updatedData.lab_name]: updatedData.items,
      }));
    });

    // Membersihkan koneksi socket ketika komponen dilepas
    return () => {
      socket.disconnect();
    };
  }, []);

  // Mengambil data awal dari server saat pertama kali dimuat
  useEffect(() => {
    fetch(`http://localhost:3001/api/items/${selectedLab}`)
      .then((response) => response.json())
      .then((data) =>
        setItems((prevItems) => ({
          ...prevItems,
          [selectedLab]: data,
        }))
      )
      .catch((error) => console.error("Error fetching items:", error));
  }, [selectedLab]);

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl mb-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Monitoring Laboratorium
          </h1>
          <div className="w-6"></div>
        </header>

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

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Daftar Alat Laboratorium {selectedLab}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items[selectedLab]?.map((item, index) => (
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
                      Tersedia: {item.available}
                    </span>
                    <span className="text-red-600 text-sm">
                      Rusak: {item.broken}
                    </span>
                    <span className="text-yellow-600 text-sm">
                      Perbaikan: {item.under_repair}
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
