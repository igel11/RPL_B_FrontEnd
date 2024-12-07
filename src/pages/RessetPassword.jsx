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
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      outline: 'none',
      marginBottom: '1rem',
    },
    button: {
      width: '100%',
      backgroundColor: '#1f2937',
      color: '#fff',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              placeholder="New Password"
              style={styles.input}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              style={styles.input}
            />
          </div>
          <div>
            <button
              type="submit"
              style={styles.button}
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
