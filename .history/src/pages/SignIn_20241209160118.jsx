import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log('Server response:', data); // Menampilkan respons server untuk debugging

      if (response.ok) {
        alert('Login successful');
        this.setState({ redirect: true });
      } else {
        alert('Error: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred: ' + error.message);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-center font-bold text-xl mb-4">Management System</h1>
          <h2 className="text-center font-bold text-lg mb-4">Lab TI UNSRAT</h2>
          <h3 className="text-center font-semibold text-md mb-4">SIGN IN</h3>
          <form onSubmit={this.handleSubmit}>
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
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-md"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
