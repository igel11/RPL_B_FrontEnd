import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import { Link } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate untuk navigasi ke halaman Dashboard

  const handleLogin = (e) => {
    e.preventDefault();
    // Logika untuk melakukan autentikasi login bisa ditambahkan di sini
    // Jika autentikasi berhasil, arahkan pengguna ke Dashboard
    navigate('/Dashboard');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">Management System</h1>
        <h2 className="text-2xl font-bold text-center mb-6">Lab TI UNSRAT</h2>
        <h3 className="text-lg font-semibold text-center mb-4">LOGIN</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-6 relative">
            <input 
              type={passwordVisible ? "text" : "password"} // Menampilkan teks atau titik berdasarkan status passwordVisible
              placeholder="Password" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {passwordVisible ? "Hide" : "Show"} {/* Menampilkan teks "Hide" atau "Show" */}
            </button>
          </div>
          <div className="mb-4">
            <button 
              type="submit" 
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <Link to="/FindAccount" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </div>
        </form>

        {/* Tombol Register */}
        <div className="text-center mt-4">
          <span className="text-black">Don't have an account? </span>
          <Link to="/SignUp" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
