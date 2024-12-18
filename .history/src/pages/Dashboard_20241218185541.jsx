import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]); // Daftar reservasi
  const [stats, setStats] = useState({
    absensi: 124,
    reservasi: 42,
  });
  const [name, setName] = useState(""); // Nama pengguna
  const [role, setRole] = useState(""); // Role pengguna
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login
  const [isModalOpen, setIsModalOpen] = useState(false); // State modal
  const [modalImage, setModalImage] = useState(""); // Gambar yang ditampilkan di modal

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");

    if (storedName && storedRole) {
      setIsLoggedIn(true);
      setName(storedName); // Ambil nama pengguna dari localStorage
      setRole(storedRole); // Ambil role pengguna dari localStorage

      axios
        .get("http://localhost:3500/api/user/profile", {
          params: { email: storedName },
        })
        .then((response) => {
          setStats({
            absensi: response.data.absensi || 0,
            reservasi: response.data.reservasi || 0,
          });

          // Mengambil data reservasi pengguna
          axios
            .get(`http://localhost:3500/api/reservations`, {
              params: { email: storedName },
            })
            .then((res) => {
              setReservations(res.data); // Menyimpan daftar reservasi
            })
            .catch((err) => console.error("Error fetching reservations:", err));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  // Fungsi untuk membuka modal dengan gambar
  const openModal = (image) => {
    setIsModalOpen(true);
    setModalImage(image); // Set gambar yang akan ditampilkan di modal
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(""); // Clear gambar modal saat ditutup
  };

  const handleNewReservation = (newReservation) => {
    setReservations([...reservations, newReservation]); // Menambahkan reservasi baru
    setStats((prevStats) => ({
      ...prevStats,
      reservasi: prevStats.reservasi + 1, // Menambah jumlah reservasi
    }));
  };

  const handleCancelReservation = (reservationId) => {
    axios
      .delete(`http://localhost:3500/api/reservations/${reservationId}`)
      .then((response) => {
        setReservations(reservations.filter((r) => r.id !== reservationId));
        setStats((prevStats) => ({
          ...prevStats,
          reservasi: prevStats.reservasi - 1, // Mengurangi jumlah reservasi
        }));
        alert("Reservasi berhasil dibatalkan!");
      })
      .catch((error) => {
        console.error("Error cancelling reservation:", error);
        alert("Gagal membatalkan reservasi.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/Profile"); // Navigate to login page on logout
  };

  const sidebarMenus = [
    { icon: "fa-home", text: "Dasbor", path: "/dashboard" },
    { icon: "fa-qrcode", text: "Absensi", path: "/Absensi" },
    { icon: "fa-calendar-alt", text: "Reservasi", path: "/Reservasi" },
    { icon: "fa-bell", text: "Notifikasi", path: "/Notifikasi" },
    { icon: "fa-user", text: "Profile", path: "/Profile" },
    {
      icon: "fa-exclamation-triangle",
      text: "Laporan Kerusakan",
      path: "/Laporan",
    },
    { icon: "fa-desktop", text: "Monitoring Alat", path: "/Monitoring" },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .sidebar-item:hover {
          transition: all 0.3s ease;
        }
      `}</style>

      <div className="flex h-screen overflow-hidden bg-gray-50">
        <div className="w-64 bg-gradient-to-b from-gray-900 to-black text-white p-6 shadow-2xl">
          <div className="mb-12 flex items-center space-x-3">
            <img
              src="/images/laboratorium-fatek-4-400x340.jpg"
              className="rounded-full"
              alt="Logo"
              width="50"
              height="50"
              style={{ objectFit: "cover" }} // Menjaga proporsi gambar tetap terjaga
              onClick={() =>
                openModal("/images/laboratorium-fatek-4-400x340.jpg")
              } // Open modal on click
            />
            <h1 className="text-xl font-bold">Lab TI UNSRAT</h1>
          </div>

          <nav>
            <ul className="space-y-4">
              {sidebarMenus.map((menu, index) => (
                <li
                  key={index}
                  className="group cursor-pointer sidebar-item"
                  onClick={() => navigate(menu.path)}
                >
                  <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition">
                    <i
                      className={`fas ${menu.icon} text-xl group-hover:text-blue-400`}
                    ></i>
                    <span className="group-hover:text-blue-300">
                      {menu.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="relative w-96"></div>

            <div className="flex items-center space-x-6">
              <div className="relative" onClick={() => navigate("/Notifikasi")}>
                <i className="fas fa-bell text-xl text-gray-600 hover:text-blue-600 cursor-pointer"></i>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  3
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div onClick={handleLogout} className="cursor-pointer">
                  <img
                    src="https://placehold.co/40x40"
                    className="rounded-full"
                    alt="Profile"
                  />
                </div>
                <div>
                  <p className="font-semibold">{name || ".."}</p>
                  <p className="text-xs text-gray-500">
                    {role || "Role not set"}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-2">
                Selamat Datang, {name || ".."}
              </h2>
              <p className="text-blue-100">
                Pada web laboratorium Teknik Informatika UNSRAT
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-1000 mb-2">Absensi Hari Ini</h3>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.absensi}
                    </p>
                  </div>
                  <i className="fas fa-calendar-check text-5xl text-gray-500"></i>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-1000 mb-2">Total Reservasi</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.reservasi}
                    </p>
                  </div>
                  <i className="fas fa-calendar-alt text-5xl text-gray-500"></i>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Reservasi kamu</h3>
              <table className="w-full table-auto text-left">
                <thead>
                  <tr>
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Ruangan</th>
                    <th className="py-2 px-4">Tanggal</th>
                    <th className="py-2 px-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation, index) => (
                    <tr key={reservation.id} className="border-b">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{reservation.room}</td>
                      <td className="py-2 px-4">{reservation.date}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() =>
                            handleCancelReservation(reservation.id)
                          }
                          className="bg-red-600 text-white rounded-lg py-1 px-4"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>

        {/* Modal untuk menampilkan gambar lebih besar */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal} // Menutup modal saat klik di luar gambar
          >
            <div
              className="bg-white p-4 rounded-lg relative"
              onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat klik gambar
            >
              <button
                className="absolute top-4 right-4 text-xl font-bold"
                onClick={closeModal}
              >
                X
              </button>
              <img
                src={modalImage}
                alt="Logo"
                className="max-w-full max-h-screen"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
