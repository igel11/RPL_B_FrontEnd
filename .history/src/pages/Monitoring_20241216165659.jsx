import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const Monitoring = () => {
  const [selectedLab, setSelectedLab] = useState(""); // State untuk menyimpan lab yang dipilih
  const [labItems, setLabItems] = useState([]); // State untuk menyimpan data alat laboratorium
  const [role, setRole] = useState(""); // State untuk menyimpan role pengguna
  const labs = [
    "Keamanan Cyber",
    "Teknologi Basis Data",
    "Multi Media",
    "Rekayasa Perangkat Lunak",
  ];

  // Mengambil role dari localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // Menghubungkan ke server Socket.io dan menerima pembaruan data secara real-time
  useEffect(() => {
    const socket = io("http://localhost:3500");

    // Mendengarkan event updateLabItems dari server
    socket.on("updateLabItems", (data) => {
      if (data[selectedLab]) {
        setLabItems(data[selectedLab]); // Update state dengan data yang diterima
      }
    });

    return () => {
      socket.disconnect(); // Tutup koneksi saat komponen unmount
    };
  }, [selectedLab]);

  // Mengambil data alat laboratorium berdasarkan lab yang dipilih
  useEffect(() => {
    if (!selectedLab) return; // Tidak melakukan fetch jika belum ada lab yang dipilih

    const fetchLabItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/api/monitoring?lab_name=${selectedLab}`
        );
        setLabItems(response.data[selectedLab] || []); // Simpan data yang diterima ke dalam state
      } catch (error) {
        console.error("Error fetching lab items:", error);
      }
    };

    fetchLabItems(); // Panggil fungsi fetch data setelah selectedLab dipilih
  }, [selectedLab]);

  // Fungsi untuk memperbarui jumlah alat di server (hanya untuk dosen)
  const updateLabItem = async (itemIndex, field, value) => {
    if (role !== "Dosen") return; // Jika bukan Dosen, tidak bisa mengupdate

    try {
      const updatedLabItems = [...labItems];
      const item = updatedLabItems[itemIndex];

      // Pastikan nilai tidak negatif
      if (value < 0) return;

      // Update nilai pada state
      item[field] = value;
      item.total = item.available + item.broken + item.under_repair;
      setLabItems(updatedLabItems);

      // Kirim data yang diperbarui ke server
      await axios.post("http://localhost:3500/api/monitoring/add_item", {
        lab_name: selectedLab,
        item_name: item.item_name,
        available: item.available,
        broken: item.broken,
        under_repair: item.under_repair,
      });
    } catch (error) {
      console.error("Error updating lab item:", error);
    }
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
            Pilih Laboratorium:
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
                  }
                `}
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
            Daftar Alat Laboratorium: {selectedLab}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labItems.length === 0 ? (
              <p className="text-center text-gray-500">
                Kamu belum memilih laboratorium
              </p>
            ) : (
              labItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-50 p-4 rounded-lg space-y-2"
                >
                  <div className="flex items-center">
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
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tersedia:</span>
                      <input
                        type="number"
                        value={item.available}
                        onChange={(e) =>
                          updateLabItem(
                            index,
                            "available",
                            parseInt(e.target.value)
                          )
                        }
                        disabled={role !== "Dosen"} // Hanya dosen yang bisa mengubah
                        className="w-16 p-1 border rounded text-center"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rusak:</span>
                      <input
                        type="number"
                        value={item.broken}
                        onChange={(e) =>
                          updateLabItem(
                            index,
                            "broken",
                            parseInt(e.target.value)
                          )
                        }
                        disabled={role !== "Dosen"} // Hanya dosen yang bisa mengubah
                        className="w-16 p-1 border rounded text-center"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Perbaikan:</span>
                      <input
                        type="number"
                        value={item.under_repair}
                        onChange={(e) =>
                          updateLabItem(
                            index,
                            "under_repair",
                            parseInt(e.target.value)
                          )
                        }
                        disabled={role !== "Dosen"} // Hanya dosen yang bisa mengubah
                        className="w-16 p-1 border rounded text-center"
                      />
                    </div>
                    {/* Baris Total */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Total:</span>
                      <span className="text-sm font-medium -ml-0">
                        {item.total}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
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
