import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook untuk navigasi

const ActivationCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate(); // Hook untuk navigasi
  
  const handleChange = (e) => {
    const value = e.target.value;
    // Pastikan hanya angka yang bisa dimasukkan
    if (/^\d*$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk mengirimkan kode aktivasi ke server dapat ditambahkan di sini

    // Jika kode valid, arahkan ke halaman reset password
    navigate('/RessetPassword'); // Pengalihan ke halaman reset password
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
      position: 'relative',
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
        <h1 style={styles.header}>Activation Code</h1>
        <h2 style={styles.subHeader}>Enter Your Activation Code</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputWrapper}>
            <input 
              type="password" 
              placeholder="Enter the code sent to your email"
              value={code}
              onChange={handleChange}
              style={styles.input}
              maxLength={6} // Atur agar hanya 6 digit
              required
            />
            <style>
              {`
                @keyframes move-left {
                  0% { transform: translateX(0); }
                  50% { transform: translateX(-10px); }
                  100% { transform: translateX(0); }
                }
                .placeholder-shown:focus::placeholder {
                  transform: translateX(-10px);
                  transition: transform 0.3s ease-in-out;
                }
              `}
            </style>
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
            <a href="/FindAccount" style={styles.link}>Back</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivationCode;
