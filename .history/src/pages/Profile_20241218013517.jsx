import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    if (!name || !role) {
      setIsLoggedIn(false);
      navigate("/SignIn"); // Jika tidak login, arahkan ke halaman login
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  if (!isLoggedIn) {
    return null; // Menunggu sampai pengecekan login selesai
  }

  return (
    <div>
      <h1>Profile</h1>
      {/* Konten halaman profile */}
    </div>
  );
};

export default Profile;
