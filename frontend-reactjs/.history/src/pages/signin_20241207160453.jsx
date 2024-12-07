import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import { Link } from 'react-router-dom';

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
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.5rem',
    },
    subtitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    loginHeader: {
      fontSize: '1.125rem',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      marginBottom: '1.5rem',
      outline: 'none',
      transition: 'box-shadow 0.2s ease',
    },
    inputFocus: {
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
    },
    button: {
      width: '100%',
      backgroundColor: '#1f2937',
      color: '#ffffff',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
    },
    buttonHover: {
      backgroundColor: '#111827',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    textCenter: {
      textAlign: 'center',
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
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Management System</h1>
        <h2 style={styles.subtitle}>Lab TI UNSRAT</h2>
        <h3 style={styles.loginHeader}>LOGIN</h3>
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
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          <div>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)
              }
            >
              Login
            </button>
          </div>
          <div style={styles.textCenter}>
            <Link to="/FindAccount" style={styles.link}>
              Forgot Password?
            </Link>
          </div>
        </form>
        <div style={{ ...styles.textCenter, marginTop: '1rem' }}>
          <span style={{ color: '#000000' }}>Don't have an account? </span>
          <Link to="/SignUp" style={styles.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
