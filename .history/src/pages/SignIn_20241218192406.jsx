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

    const userData = { email, password };
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3500/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server responded with:", text);
        alert("An error occurred: " + text);
        return;
      }

      const data = await response.json();
      if (data.message === "Login successful") {
        alert("Login successful");

        // Simpan nama pengguna dan role di localStorage
        localStorage.setItem("name", data.name); // Simpan nama pengguna
        localStorage.setItem("role", data.role); // Simpan role pengguna
        localStorage.setItem("email", data.email); // Simpan role

        // Navigasi ke dashboard setelah login berhasil
        navigate("/Dashboard");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-center font-bold text-xl mb-4">
          Management System
        </h1>
        <h2 className="text-center font-bold text-lg mb-6">Lab TI UNSRAT</h2>
        <h3 className="text-center font-semibold text-md mb-4">LOGIN</h3>
        <form onSubmit={handleLogin}>
          <div className="flex items-center border border-gray-300 rounded-md mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="flex-1 p-3 border-none outline-none"
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md mb-6">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="flex-1 p-3 border-none outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-600 cursor-pointer bg-none border-none text-xl"
            >
              <FontAwesomeIcon
                className="eye-icon"
                icon={passwordVisible ? faEyeSlash : faEye}
                style={{ marginLeft: "-50px" }}
              />
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <Link to="/SignUp" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;