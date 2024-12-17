import React, { useState, useEffect } from "react";
import axios from "axios";

const Laporan = () => {
  const [name, setName] = useState(""); // Nama pengirim laporan
  const [subRole, setSubRole] = useState(""); // Sub-Role atau peran pengguna
  const [alat, setAlat] = useState(""); // Nama alat yang rusak
  const [lokasiRuangan, setLokasiRuangan] = useState(""); // Lokasi ruangan alat
  const [deskripsiKerusakan, setDeskripsiKerusakan] = useState(""); // Deskripsi kerusakan alat
  const [gambar, setGambar] = useState(null); // File gambar
  const [gambarPreview, setGambarPreview] = useState(null); // URL gambar sementara untuk pratinjau
  const [errorMessage, setErrorMessage] = useState(""); // Pesan error jika ada
  const [successMessage, setSuccessMessage] = useState(""); // Pesan sukses jika berhasil

  // Memuat data pengguna setelah login berhasil
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/laporan", {
          params: { id: 4 }, // Ganti dengan ID pengguna yang aktif
        });
        setName(response.data.name); // Set nama pengguna
        setSubRole(response.data.subRole); // Set sub-role pengguna
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!alat || !lokasiRuangan || !deskripsiKerusakan || !gambar) {
      setErrorMessage("Semua kolom harus diisi, termasuk unggah gambar.");
      setSuccessMessage(""); // Reset pesan sukses
      return;
    }

    // Membuat objek FormData untuk mengirimkan data form
    const formData = new FormData();
    formData.append("name", name);
    formData.append("subRole", subRole);
    formData.append("alat", alat);
    formData.append("lokasi_ruangan", lokasiRuangan);
    formData.append("deskripsi_kerusakan", deskripsiKerusakan);
    formData.append("gambar", gambar); // Menggunakan gambar yang disimpan di state

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

      // Cek apakah laporan berhasil dikirim
      if (response.status === 200) {
        setSuccessMessage("Laporan kerusakan berhasil dikirim!");
        setErrorMessage(""); // Reset pesan error jika berhasil
      }
    } catch (error) {
      setErrorMessage(
        "Terjadi kesalahan saat mengirim laporan. Periksa koneksi atau coba lagi."
      );
      setSuccessMessage(""); // Reset pesan sukses jika gagal
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file); // Menyimpan file gambar
      setGambarPreview(URL.createObjectURL(file)); // Menyimpan URL sementara untuk pratinjau
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
          <div className="w-6"></div>
        </header>

        <main className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Input Nama Alat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Alat
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={alat}
                  onChange={(e) => setAlat(e.target.value)}
                >
                  <option value="">Pilih Alat</option>
                  <option value="komputer">Komputer</option>
                  <option value="mouse">Mouse</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="printer3d">Printer 3D</option>
                </select>
              </div>

              {/* Input Lokasi Ruangan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi Ruangan
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={lokasiRuangan}
                  onChange={(e) => setLokasiRuangan(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih lokasi ruangan
                  </option>
                  <option value="Cyber">Cyber</option>
                  <option value="TBD">TBD</option>
                  <option value="Mulmed">Mulmed</option>
                  <option value="RPL">RPL</option>
                </select>
              </div>

              {/* Input Deskripsi Kerusakan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Kerusakan
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Jelaskan kerusakan yang dialami"
                  required
                  value={deskripsiKerusakan}
                  onChange={(e) => setDeskripsiKerusakan(e.target.value)}
                ></textarea>
              </div>

              {/* Input Unggah Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unggah Foto
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {gambarPreview ? (
                    <>
                      {/* Pratinjau Gambar */}
                      <img
                        src={gambarPreview}
                        alt="Pratinjau Foto"
                        className="max-w-xs mx-auto mb-2"
                      />
                      <p className="text-gray-500 text-sm">
                        Gambar telah dipilih
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Jika belum ada gambar */}
                      <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                      <p className="text-gray-600 mb-2">
                        Seret dan lepas foto di sini
                      </p>
                      <p className="text-sm text-gray-500">atau</p>
                      <label className="inline-block mt-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition">
                        Pilih Foto
                        <input
                          type="file"
                          className="hidden"
                          disabled={gambarPreview} // Nonaktifkan input jika sudah ada gambar
                          onChange={handleFileChange}
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Pesan Error atau Sukses */}
              {errorMessage && (
                <div className="text-red-600 text-sm mt-4">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-600 text-sm mt-4">
                  {successMessage}
                </div>
              )}

              {/* Tombol Kirim Laporan */}
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