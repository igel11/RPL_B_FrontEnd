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

    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-2">Management System</h1>
          <h2 className="text-2xl font-bold text-center mb-6">Lab TI UNSRAT</h2>
          <h3 className="text-lg font-semibold text-center mb-4">SIGN UP</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Name"
                value={this.state.username}
                onChange={this.handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="mb-4">
              <span className="block text-gray-700">User</span>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="dosen"
                  name="role"
                  value="Dosen"
                  checked={this.state.role === 'Dosen'}
                  onChange={this.handleRoleChange}
                  className="mr-2"
                />
                <label htmlFor="dosen" className="mr-4">Dosen</label>

                <input
                  type="radio"
                  id="mahasiswa"
                  name="role"
                  value="Mahasiswa"
                  checked={this.state.role === 'Mahasiswa'}
                  onChange={this.handleRoleChange}
                  className="mr-2"
                />
                <label htmlFor="mahasiswa">Mahasiswa</label>
              </div>
            </div>

            {/* Subrole Selection (only for Mahasiswa) */}
            {this.state.role === 'Mahasiswa' && (
              <div className="mb-4">
                <span className="block text-gray-700">Sub user</span>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="asisten"
                    name="subRole"
                    value="Asisten Lab"
                    checked={this.state.subRole === 'Asisten Lab'}
                    onChange={this.handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="asisten" className="mr-4">Asisten Lab</label>

                  <input
                    type="radio"
                    id="umum"
                    name="subRole"
                    value="Mahasiswa Umum"
                    checked={this.state.subRole === 'Mahasiswa Umum'}
                    onChange={this.handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="umum">Mahasiswa Umum</label>
                </div>
              </div>
            )}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <span className="text-black">Already have an account? </span>
              <Link to="/SignIn" className="text-blue-600 hover:underline">
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
