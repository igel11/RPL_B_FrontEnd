import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    absensi: 124,
    reservasi: 42,
  });
  const [userName, setUserName] = useState(""); // State untuk nama pengguna
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login

  useEffect(() => {
    // Cek apakah pengguna sudah login
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName); // Ambil nama pengguna dari localStorage

      // Mengambil data profil pengguna setelah login
      axios
        .get("http://localhost:3500/user/profile", {
          params: { email: storedUserName },
        })
        .then((response) => {
          // Misalnya, mengambil data aktivitas dan statistik lainnya
          setActivities(response.data.activities || []); // Pastikan server mengembalikan data aktivitas
          setStats({
            absensi: response.data.absensi || 0,
            reservasi: response.data.reservasi || 0,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/");
  };

  const sidebarMenus = [
    { icon: "fa-home", text: "Dashboard", path: "/dashboard" },
    { icon: "fa-qrcode", text: "Absensi", path: "/Absensi" },
    { icon: "fa-calendar-alt", text: "Reservasi", path: "/Reservasi" },
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
              src="https://placehold.co/50x50"
              className="rounded-full"
              alt="Logo"
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
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
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
                  <p className="font-semibold">{userName || ".."}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-2">
                Welcome Back, {userName || ".."}
              </h2>
              <p className="text-blue-100">
                Pada web laboratorium Teknik Informatika UNSRAT
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-500 mb-2">Total Absensi</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.absensi}
                    </p>
                  </div>
                  <i className="fas fa-qrcode text-3xl text-blue-300"></i>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-500 mb-2">Reservasi</h3>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.reservasi}
                    </p>
                  </div>
                  <i className="fas fa-calendar-alt text-3xl text-green-300"></i>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <p>{activity.description}</p>
                      <span className="text-sm text-gray-400">
                        {activity.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No activities found.</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
