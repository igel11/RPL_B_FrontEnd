import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios"; // Import axios untuk melakukan request

const Monitoring = () => {
  const [selectedLab, setSelectedLab] = useState("Cyber");
  const [labItems, setLabItems] = useState([]); // State untuk menyimpan lab items yang diambil dari API
  const labs = ["Cyber", "TBD", "MulMed", "RPL"];

  // Menyambungkan dengan socket.io untuk menerima pembaruan data secara real-time
  useEffect(() => {
    const socket = io("http://localhost:3500"); // Menghubungkan ke server Socket.IO backend

    socket.on("updateLabItems", (data) => {
      console.log("Lab items diperbarui:", data);
      setLabItems(data[selectedLab] || []); // Perbarui state dengan data terbaru untuk lab yang dipilih
    });

    return () => {
      socket.disconnect(); // Bersihkan koneksi saat komponen unmount
    };
  }, [selectedLab]);

  // Fetch data alat laboratorium berdasarkan lab yang dipilih
  useEffect(() => {
    const fetchLabItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/api/monitoring`
        );
        setLabItems(response.data[selectedLab] || []); // Simpan data yang diterima ke dalam state labItems
      } catch (error) {
        console.error("Error fetching lab items:", error);
      }
    };

    fetchLabItems(); // Panggil fungsi untuk mengambil data setiap kali selectedLab berubah
  }, [selectedLab]);

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
            {labItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 p-4 rounded-lg"
              >
                {/* Pastikan bagian icon sesuai dengan data yang ada */}
                <div
                  className={`mr-4 ${
                    item.iconBg || "bg-gray-300"
                  } p-3 rounded-full`}
                >
                  <span
                    className={`text-2xl ${item.iconColor || "text-black"}`}
                  >
                    {item.icon || "⚙️"}
                  </span>
                </div>
                <div className="flex-grow">
                  <p className="text-base font-medium">{item.item_name}</p>
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
                    <span className="text-black text-sm">
                      Total: {item.total}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Reservasi Button */}
      <div className="w-full">
        <Link
          to="/reservasi"
          className="block w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl mb-6"
        >
          Reservasi
        </Link>
      </div>
    </div>
  );
};

export default Monitoring;
