import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Menggunakan Navigate

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      role: '',
      subRole: '',
      redirect: false, // State untuk pengaturan redirect
    };
  }

  // Fungsi untuk menangani perubahan input
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Fungsi untuk menangani perubahan pilihan role
  handleRoleChange = (e) => {
    const role = e.target.value;
    this.setState({ role, subRole: '' }); // Reset subrole saat role berubah
  };

  // Fungsi untuk menangani submit form
  handleSubmit = (e) => {
    e.preventDefault();
    // Di sini Anda bisa melakukan validasi atau API call
    // Setelah berhasil, navigasi ke halaman lain
    // Menggunakan Navigate untuk navigasi
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/SignIn" />; // Menggunakan Navigate untuk redirect
    }

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
      header: {
        textAlign: 'center',
        fontWeight: 'bold',
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
      radioGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
      },
      radioLabel: {
        marginRight: '1rem',
        marginBottom: '0',
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
      subRoleGroup: {
        marginBottom: '1rem',
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.header}>Management System</h1>
          <h2 style={styles.header}>Lab TI UNSRAT</h2>
          <h3 style={styles.header}>SIGN UP</h3>
          <form onSubmit={this.handleSubmit}>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="username"
                placeholder="Name"
                value={this.state.username}
                onChange={this.handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputWrapper}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputWrapper}>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>User</span>
              <div style={styles.radioGroup}>
                <input
                  type="radio"
                  id="dosen"
                  name="role"
                  value="Dosen"
                  checked={this.state.role === 'Dosen'}
                  onChange={this.handleRoleChange}
                />
                <label htmlFor="dosen" style={styles.radioLabel}>Dosen</label>

                <input
                  type="radio"
                  id="mahasiswa"
                  name="role"
                  value="Mahasiswa"
                  checked={this.state.role === 'Mahasiswa'}
                  onChange={this.handleRoleChange}
                />
                <label htmlFor="mahasiswa" style={styles.radioLabel}>Mahasiswa</label>
              </div>
            </div>

            {/* Subrole Selection (only for Mahasiswa) */}
            {this.state.role === 'Mahasiswa' && (
              <div style={styles.subRoleGroup}>
                <span style={{ display: 'block', marginBottom: '0.5rem' }}>Sub user</span>
                <div style={styles.radioGroup}>
                  <input
                    type="radio"
                    id="asisten"
                    name="subRole"
                    value="Asisten Lab"
                    checked={this.state.subRole === 'Asisten Lab'}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="asisten" style={styles.radioLabel}>Asisten Lab</label>

                  <input
                    type="radio"
                    id="umum"
                    name="subRole"
                    value="Mahasiswa Umum"
                    checked={this.state.subRole === 'Mahasiswa Umum'}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="umum" style={styles.radioLabel}>Mahasiswa Umum</label>
                </div>
              </div>
            )}

            <div style={styles.inputWrapper}>
              <button
                type="submit"
                style={styles.button}
              >
                Sign Up
              </button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <span>Already have an account? </span>
              <Link to="/SignIn" style={styles.link}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
