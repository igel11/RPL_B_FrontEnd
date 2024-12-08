import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic or validation if needed

    // After the process is complete, navigate to the SignIn page
    navigate('/SignIn');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full p-3 border border-gray-300 rounded-md outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md"
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