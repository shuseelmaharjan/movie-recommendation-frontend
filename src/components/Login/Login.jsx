import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bg from './../../assets/bg1.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });

      if (response.data.userId && response.data.access_token && response.data.refresh_token) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        navigate('/');
      } else {
        setError('Invalid login credentials.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "calc(100vh - 70px)",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1,
        }}
      ></div>

      <div className="container position-relative text-white" style={{ zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="card shadow-lg border-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body px-4 py-5 text-white">
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control bg-transparent text-white border border-gray-500 focus:border-white focus:ring-0 placeholder-gray-400"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control bg-transparent text-white border border-gray-500 focus:border-white focus:ring-0 placeholder-gray-400"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn"
                      style={{ background: "orange" }}
                    >
                      <strong>Login</strong>
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <p className="mb-0">
                      Don’t have an account?{" "}
                      <Link to="/register" className="text-white">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
                {error && (
                  <div
                    className="alert alert-danger mt-3"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
