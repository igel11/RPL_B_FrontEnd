import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      role: '',
      subRole: '',
      redirect: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRoleChange = (e) => {
    const role = e.target.value;
    this.setState({ role, subRole: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, role, subRole } = this.state;

    const userData = {
      username,
      email,
      password,
      role,
      subRole,
    };

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log('Server response:', data); // Menampilkan respons server untuk debugging
  
      if (response.ok) {
        alert('User registered successfully');
        this.setState({ redirect: true });
      } else {
        alert('Error: ' + (data.message || 'Unknown error')); // Menambahkan fallback jika message tidak ada
      }
    } catch (error) {
      console.error('Error:', error); // Log error lebih jelas di konsol
      alert('An error occurred: ' + error.message); // Menampilkan pesan error yang lebih spesifik
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/SignIn" />;
    }

    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-center font-bold text-xl mb-4">Management System</h1>
          <h2 className="text-center font-bold text-lg mb-4">Lab TI UNSRAT</h2>
          <h3 className="text-center font-semibold text-md mb-4">SIGN UP</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Name"
                value={this.state.username}
                onChange={this.handleChange}
                className="w-full p-3 border border-gray-300 rounded-md outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                className="w-full p-3 border border-gray-300 rounded-md outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                className="w-full p-3 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div className="mb-4">
              <span className="block mb-2">User </span>
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

            {this.state.role === 'Mahasiswa' && (
              <div className="mb-4">
                <span className="block mb-2">Sub user</span>
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
                className="w-full bg-gray-800 text-white py-2 rounded-md"
              >
                Sign Up
              </button>
            </div>

            <div className="text-center">
              <span>Already have an account? </span>
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
