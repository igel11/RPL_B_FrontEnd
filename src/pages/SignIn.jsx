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
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '0 1rem',
      marginBottom: '1.5rem',
    },
    input: {
      flex: 1,
      padding: '0.75rem 0',
      border: 'none',
      outline: 'none',
    },
    iconButton: {
      color: '#4b5563',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontSize: '1.25rem',
    },
    button: {
      width: '100%',
      backgroundColor: '#1f2937',
      color: '#fff',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
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
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
            />
          </div>
          <div style={styles.inputWrapper}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              style={styles.input}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={styles.iconButton}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          <div>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link to="/FindAccount" style={styles.link}>
              Forgot Password?
            </Link>
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span>Don't have an account? </span>
          <Link to="/SignUp" style={styles.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
