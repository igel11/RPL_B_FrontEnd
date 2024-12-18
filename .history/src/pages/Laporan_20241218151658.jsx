import React, { useState } from "react";

const Laporan = () => {
  const [namaAlat, setNamaAlat] = useState("");
  const [lokasiRuangan, setLokasiRuangan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file)); // Membuat pratinjau gambar
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama_alat", namaAlat);
    formData.append("lokasi_ruangan", lokasiRuangan);
    formData.append("deskripsi", deskripsi);
    formData.append("foto", foto);

    try {
      const response = await fetch("http://localhost:3500/api/laporan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengirim laporan");
      }

      const data = await response.json();
      alert("Laporan berhasil dikirim!");
      console.log(data);
      setNamaAlat("");
      setLokasiRuangan("");
      setDeskripsi("");
      setFoto(null);
      setFotoPreview(null);
    } catch (error) {
      console.error(error.message);
      alert("Gagal mengirim laporan, silakan coba lagi.");
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
          <div className="w-6"></div>
        </header>

        <main className="mt-8 space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Alat
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={namaAlat}
                  onChange={(e) => setNamaAlat(e.target.value)}
                >
                  <option value="">Pilih Alat</option>
                  <option value="komputer">Komputer</option>
                  <option value="mouse">Mouse</option>
                  <option value="keyboard">Keyboard</option>
                  <option value="printer3d">Printer 3D</option>
                  <option value="printer2d">Printer 2D</option>
                </select>
              </div>

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
                  <option value="">Pilih lokasi ruangan</option>
                  <option value="Cyber">Keamanan Cyber</option>
                  <option value="TBD">Teknologi Basis Data</option>
                  <option value="Mulmed">Multi Media</option>
                  <option value="RPL">Rekayasa Perangkat Lunak</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Kerusakan
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Jelaskan kerusakan yang dialami"
                  required
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unggah Foto
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {fotoPreview ? (
                    <img
                      src={fotoPreview}
                      alt="Preview"
                      className="mb-4 mx-auto h-70 object-contain"
                    />
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2"></p>
                      <label className="inline-block mt-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition">
                        Pilih Foto
                        <input
                          type="file"
                          className="hidden"
                          required
                          onChange={handleFileChange}
                        />
                      </label>
                    </>
                  )}
                </div>
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