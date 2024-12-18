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
  const [userRole, setUserRole] = useState(""); // State untuk role pengguna
  const [userSubRole, setUserSubRole] = useState(""); // State untuk sub-role pengguna
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
          // Pastikan server mengembalikan data aktivitas dan statistik lainnya
          setActivities(response.data.activities || []);
          setStats({
            absensi: response.data.absensi || 0,
            reservasi: response.data.reservasi || 0,
          });
          setUserRole(response.data.role || "Unknown"); // Set role pengguna
          setUserSubRole(response.data.subRole || "Unknown"); // Set subRole pengguna
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
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-gray-900 to-black text-white p-6 shadow-2xl">
          {/* Sidebar content */}
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            {/* Header */}
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
                <p className="text-xs text-gray-500">
                  {userRole} - {userSubRole}{" "}
                  {/* Menampilkan role dan sub-role */}
                </p>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Main content */}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
