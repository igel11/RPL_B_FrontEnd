import React, { useState, useEffect } from "react";
import axios from "axios";

const Laporan = () => {
  const [alat, setAlat] = useState("");
  const [lokasi_ruangan, setLokasi] = useState("");
  const [deskripsi_kerusakan, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [userName, setUserName] = useState(""); // Menyimpan userName
  const [subRole, setSubRole] = useState(""); // Menyimpan subRole

  // Ambil data pengguna setelah login
  useEffect(() => {
    const getUserData = async () => {
      const email = "user@example.com"; // Ganti dengan email yang digunakan untuk login
      const password = "password123"; // Ganti dengan password yang digunakan

      try {
        const response = await axios.post("http://localhost:3500/login", {
          email,
          password,
        });
        setUserName(response.data.userName); // Menyimpan userName
        setSubRole(response.data.subRole); // Menyimpan subRole
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Login failed");
      }
    };

    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userName); // Menambahkan name ke formData
    formData.append("subRole", subRole); // Menambahkan subRole ke formData
    formData.append("alat", alat);
    formData.append("lokasi", lokasi_ruangan);
    formData.append("deskripsi", deskripsi_kerusakan);
    if (gambar) formData.append("gambar", gambar);

    try {
      const response = await axios.post(
        "http://localhost:3500/laporan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Laporan berhasil dikirim!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Terjadi kesalahan saat mengirim laporan.");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <header className="w-full flex items-center justify-between p-6 bg-white shadow-md rounded-b-xl">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
            <i className="fas fa-arrow-left text-xl cursor-pointer transition"></i>
          </a>
          <h1 className="text-2xl font-bold text-gray-800">
            Laporan Kerusakan
          </h1>
        </header>

        <main className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Form inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Alat
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={alat}
                  onChange={(e) => setAlat(e.target.value)}
                  required
                >
                  <option value="">Pilih Alat</option>
                  <option value="komputer">Komputer</option>
                  <option value="mouse">Mouse</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="printer3d">Printer 3D</option>
                </select>
              </div>

              {/* Lokasi Ruangan, Deskripsi, Foto */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-semibold"
              >
                Kirim Laporan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Laporan;
