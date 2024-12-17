import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindAccount = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate the user to the activation code page after clicking continue
    navigate('/ActivationCode');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Find Your Account</h1>
        <h2 className="text-sm text-gray-600 mb-6">Confirm Your Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 border border-gray-300 rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle input change
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
            <a href="/SignIn" className="text-blue-600 underline mt-4">Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindAccount;