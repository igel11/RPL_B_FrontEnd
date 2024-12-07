import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import ikon

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

  // Objek untuk gaya
  const styles = {
    container: {
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      outline: 'none',
    },
    relative: {
      position: 'relative',
    },
    absoluteButton: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#4b5563',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontSize: '1.25rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1rem' }}>
          Management System
        </h1>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Lab TI UNSRAT
        </h2>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: '600' }}>LOGIN</h3>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
            />
          </div>
          <div style={styles.relative}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              style={styles.input}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={styles.absoluteButton}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <div>
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#1f2937',
                color: '#fff',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/FindAccount" style={{ color: '#2563eb', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span>Don't have an account? </span>
          <Link to="/SignUp" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
