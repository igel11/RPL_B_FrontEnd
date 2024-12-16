// Membuat objek FormData untuk mengirimkan data form
const formData = new FormData();
formData.append("name", name);
formData.append("subRole", subRole);
formData.append("alat", alat);
formData.append("lokasi_ruangan", lokasiRuangan);
formData.append("deskripsi_kerusakan", deskripsiKerusakan);
formData.append("gambar", gambar);

try {
  // Mengirimkan data ke backend
  const response = await axios.post(
    "http://localhost:3500/api/laporan",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // Mengirim data dalam format form-data
      },
    }
  );
  alert(response.data.message); // Menampilkan pesan sukses
} catch (error) {
  alert("Error: " + error.response.data.message); // Menampilkan pesan error
}
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
            required
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Pratinjau Gambar yang Dipilih */}
      {gambarPreview && (
        <div className="mt-4 text-center">
          <img
            src={gambarPreview}
            alt="Pratinjau Foto"
            className="max-w-xs mx-auto"
          />
        </div>
      )}
    </div>

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