import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(
    "https://placehold.co/200x200"
  );
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil name dan role dari localStorage
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");

    // Perbarui state dengan data dari localStorage
    if (storedName) setName(storedName);
    if (storedRole) setRole(storedRole);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Navigasi ke halaman dashboard
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl">
          {/* Tombol Kembali */}
          <button
            onClick={handleBackToDashboard}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Profil</h1>
          <div className="w-6"></div>
        </header>

        <main className="mt-8 space-y-6 flex flex-col items-center">
          {/* Kontainer Gambar Profil dengan Tombol Edit */}
          <div className="relative">
            <img
              src={profileImage}
              alt="Profil"
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition"
            >
              <i className="fas fa-camera"></i>
            </button>

            {/* Input File Tersembunyi */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              {name || "Admin"}
            </h2>
            <hr className="border-gray-200 mb-4" />

            {/* Form Edit Profil */}
            <div className="space-y-4">
              <div>
                <label className="text-lg font-medium text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="w-full p-2 border rounded-md mt-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-lg font-medium text-gray-800">
                  Role
                </label>
                <input
                  type="text"
                  value={role}
                  readOnly
                  className="w-full p-2 border rounded-md mt-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <button className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition">
                Simpan Perubahan
              </button>
            </div>

            <div className="mt-6">
              <p className="text-lg font-medium text-gray-800">
                Riwayat aktivitas:
              </p>
              <ul className="list-disc list-inside text-lg text-gray-600">
                <li>Reservasi Lab</li>
                <li>Absensi Praktikum</li>
                <li>Laporan Kerusakan Alat</li>
              </ul>
            </div>
          </div>
        </main>
      </div>

      {/* Tambahkan link Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </div>
  );
};

export default Profile;
