import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate dari react-router-dom

const FindAccount = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Arahkan pengguna ke halaman activation code setelah klik tombol continue
    navigate('/ActivationCode');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-center mb-2">Find Your Account</h1>
        <h2 className="text-sm text-center text-gray-600 mb-6">Confirm Your Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Menangani perubahan input
              required
            />
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
            <a href="/SignIn" className="text-blue-600 hover:underline">Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindAccount;
