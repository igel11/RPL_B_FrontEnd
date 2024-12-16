import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3500/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Simpan data user di localStorage
      localStorage.setItem("userName", data.namex); // Nama pengguna
      localStorage.setItem("role", data.role); // Role pengguna
      localStorage.setItem("subRole", data.subRole || ""); // Sub-role (opsional)

      alert("Login successful!");
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-center font-bold text-xl mb-4">
          Management System
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          <div className="mb-6 relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-md"
              required
            />
            <FontAwesomeIcon
              icon={passwordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
