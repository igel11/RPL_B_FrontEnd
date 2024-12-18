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
  const [name, setName] = useState(""); // Mengganti userName dengan name
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("name");

    if (storedName) {
      setIsLoggedIn(true);
      setName(storedName); // Mengambil name dari localStorage

      axios
        .get("http://localhost:3500/api/user/profile", {
          params: { email: storedName },
        })
        .then((response) => {
          setActivities(response.data.activities || []);
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
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("name"); // Menghapus name dari localStorage
    setIsLoggedIn(false);
    navigate("/login");
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
                  <span className="group-hover:text-blue-300">{menu.text}</span>
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
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-4">Welcome, {name}</h2>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Absensi</h3>
              <p className="text-lg">{stats.absensi}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Reservasi</h3>
              <p className="text-lg">{stats.reservasi}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-4">
            {activities.map((activity, index) => (
              <li key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg">{activity.description}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
