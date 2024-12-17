import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Absensi = () => {
  const navigate = useNavigate();

  // State untuk menyimpan nama pengguna
  const [currentUserName, setCurrentUserName] = useState("");

  // State untuk riwayat absensi
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  // State untuk QR Code
  const [qrCode, setQrCode] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://192.168.43.130:3000/absensi"
  );

  // Ambil nama pengguna dari localStorage saat komponen dimuat
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setCurrentUserName(name);
    } else {
      navigate("/signin"); // Redirect ke halaman login jika nama tidak ditemukan
    }
  }, [navigate]);

  // Fungsi generate QR Code baru
  const generateNewQRCode = () => {
    const newQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=http://192.168.43.130:3000/absensi/${Date.now()}`;
    setQrCode(newQrCode);
  };

  // Fungsi untuk menambahkan riwayat absensi
  const markAttendance = () => {
    const newAttendance = {
      id: attendanceHistory.length + 1,
      name: currentUserName, // Ambil nama pengguna dari state
      status: "Hadir",
      time: new Date().toLocaleString(),
      color: "bg-blue-500",
    };
    setAttendanceHistory((prevHistory) => [...prevHistory, newAttendance]);
  };

  // Effect untuk menandai kehadiran saat QR Code di-scan
  useEffect(() => {
    const handleQRCodeScan = () => {
      markAttendance();
    };

    const timer = setTimeout(handleQRCodeScan, 2000); // Simulasi pemindaian QR Code setelah 2 detik
    return () => clearTimeout(timer);
  }, [qrCode]);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <header className="bg-white shadow-md rounded-lg mb-8 p-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-600 hover:text-gray-800"
        >
          <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Absensi</h1>
        <div className="w-8"></div>
      </header>

      {/* Konten Utama */}
      <main className="grid md:grid-cols-2 gap-8">
        {/* Kolom QR Code */}
        <section className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Scan QR Code
          </h2>
          <img
            src={qrCode}
            alt="Kode QR Absensi"
            className="qr-code mx-auto w-64 h-64 object-cover"
          />
          <button
            onClick={generateNewQRCode}
            className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            Generate Ulang QR
          </button>
        </section>

        {/* Kolom Riwayat Absensi */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Riwayat Absensi</h3>
            <select className="border rounded px-2 py-1">
              <option>Hari Ini</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
          </div>

          <div className="space-y-4">
            {attendanceHistory.map((item) => (
              <div
                key={item.id}
                className="attendance-item bg-gray-50 rounded-lg p-4 flex items-center hover:bg-gray-100"
              >
                <div
                  className={`w-10 h-10 ${item.color} text-white rounded-full flex items-center justify-center font-bold mr-4`}
                >
                  {item.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.status}</p>
                </div>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Absensi;
