import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    // Fungsi untuk menangani login
    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim(); // Menghapus spasi di awal/akhir
        const password = e.target.password.value.trim();

        // Validasi input
        if (!email) {
            alert('Email is required');
            return;
        }
        if (!password) {
            alert('Password is required');
            return;
        }

        const userData = { email, password }; // Mengirimkan email dan password

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login successful');
                navigate('/Dashboard'); // Mengarahkan ke dashboard setelah login berhasil
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
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
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="flex-1 p-3 border-none outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-md mb-6">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
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
