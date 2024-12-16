import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook untuk navigasi

const ActivationCode = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleChange = (e) => {
    const value = e.target.value;
    // Pastikan hanya angka yang bisa dimasukkan
    if (/^\d*$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk mengirimkan kode aktivasi ke server dapat ditambahkan di sini

    // Jika kode valid, arahkan ke halaman reset password
    navigate("/ResetPassword"); // Pengalihan ke halaman reset password
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Activation Code</h1>
        <h2 className="text-sm text-gray-600 mb-6">
          Enter Your Activation Code
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Enter the code sent to your email"
              value={code}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md outline-none"
              maxLength={6} // Atur agar hanya 6 digit
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md"
            >
              Continue
            </button>
          </div>
          <div>
            <a href="/FindAccount" className="text-blue-600 underline mt-4">
              Back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivationCode;
