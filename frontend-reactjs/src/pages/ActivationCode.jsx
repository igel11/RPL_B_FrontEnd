import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate

const ActivationCode = () => {
  const [code, setCode] = useState('');
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
    navigate('/RessetPassword'); // Pengalihan ke halaman reset password
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-center mb-2">Activation Code</h1>
        <h2 className="text-sm text-center text-gray-600 mb-6">Enter Your Activation Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input 
              type="password" 
              placeholder="Enter the code sent to your email"
              value={code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-shown:animate-move-left"
              maxLength={6} // Atur agar hanya 6 digit
              required
            />
            <style>
              {`
                @keyframes move-left {
                  0% { transform: translateX(0); }
                  50% { transform: translateX(-10px); }
                  100% { transform: translateX(0); }
                }
                .placeholder-shown:focus::placeholder {
                  transform: translateX(-10px);
                  transition: transform 0.3s ease-in-out;
                }
              `}
            </style>
          </div>
          <div className="mb-4">
            <button 
              type="submit" 
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Continue
            </button>
          </div>
          <div className="text-center">
            <a href="/FindAccount" className="text-blue-600 hover:underline">Back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivationCode;
