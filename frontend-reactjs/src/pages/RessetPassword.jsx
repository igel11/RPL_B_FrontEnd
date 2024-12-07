import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika pengiriman form atau validasi jika perlu

    // Setelah proses selesai, arahkan ke halaman SignIn
    navigate('/SignIn');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
