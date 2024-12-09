import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/Dashboard');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-center font-bold text-xl mb-4">Management System</h1>
        <h2 className="text-center font-bold text-lg mb-6">Lab TI UNSRAT</h2>
        <h3 className="text-center font-semibold text-md mb-4">LOGIN</h3>
        <form onSubmit={handleLogin}>
          <div className="flex items-center border border-gray-300 rounded-md mb-6">
            <input
              type="text"
              placeholder="Username"
              className="flex-1 p-3 border-none outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-md mb-6">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="flex-1 p-3 border-none outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-600 cursor-pointer bg-none border-none text-xl"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <div>
            <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-md">
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <Link to="/FindAccount" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
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