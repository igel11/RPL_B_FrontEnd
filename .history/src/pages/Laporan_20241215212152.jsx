import React, { useState } from "react";
import axios from "axios";

const Laporan = () => {
  const [alat, setAlat] = useState("");
  const [lokasi_ruangan, setLokasi] = useState("");
  const [deskripsi_kerusakan, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Membuat formData setelah inputan diambil
    const formData = new FormData();
    formData.append("alat", alat);
    formData.append("lokasi", lokasi_ruangan);
    formData.append("deskripsi", deskripsi_kerusakan);
    if (gambar) formData.append("gambar", gambar);

    // Cek formData sebelum dikirim
    console.log(formData);

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
          {/* Tombol kembali */}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi Ruangan
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lokasi_ruangan}
                  onChange={(e) => setLokasi(e.target.value)}
                  required
                >
                  <option value="">Pilih lokasi ruangan</option>
                  <option value="Cyber">Cyber</option>
                  <option value="TBD">TBD</option>
                  <option value="Mulmed">Mulmed</option>
                  <option value="RPL">RPL</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Kerusakan
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  value={deskripsi_kerusakan}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unggah Foto
                </label>
                <input
                  type="file"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setGambar(e.target.files[0])}
                  required
                />
              </div>

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
