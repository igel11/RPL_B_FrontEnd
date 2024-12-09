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
      textAlign: 'center',
    },
    header: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    subHeader: {
      fontSize: '0.875rem',
      color: '#4b5563',
      marginBottom: '1.5rem',
    },
    inputWrapper: {
      marginBottom: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      outline: 'none',
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
      marginTop: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Find Your Account</h1>
        <h2 style={styles.subHeader}>Confirm Your Email</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputWrapper}>
            <input 
              type="email" 
              placeholder="Email" 
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Menangani perubahan input
              required
            />
          </div>
          <div style={styles.inputWrapper}>
            <button 
              type="submit" 
              style={styles.button}
            >
              Continue
            </button>
          </div>
          <div>
            <a href="/SignIn" style={styles.link}>Back to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindAccount;
