import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Ambil email dari localStorage (disimpan saat login)
    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
      navigate("/login");
      return;
    }

    // Panggil API untuk mendapatkan data pengguna
    fetch("http://localhost:3001/api/auth/get-user-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>
    </div>
  );
};

export default Profile;
