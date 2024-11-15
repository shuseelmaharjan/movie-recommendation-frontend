import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');  // For error handling
  const navigate = useNavigate();  // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks for email and password
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Sending login request to the API
      const response = await axios.post('http://localhost:8000/api/login', { email, password });

      // Check if login is successful
      if (response.data.userId && response.data.access_token && response.data.refresh_token) {
        // Store tokens and userId in localStorage
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);

        // Navigate to home page
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
    <div className="container mt-5 position-relative" style={{
        minHeight: '100vh',
      }}>
        {/* Background Image Overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: 'url("https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2F2jhtmqhg4mo81.png%3Fwidth%3D1920%26format%3Dpng%26auto%3Dwebp%26s%3D0d41709c3c478d2bcadfd8f2450271f175c0676f&rdt=61125")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5,
          }}
        ></div>
      
        <div className="row justify-content-center position-relative">
          <div className="col-md-4">
            <div className="card shadow-lg border-0">
              <div className="card-body">
                <h3 className='text-center'>Login</h3>
      
                <form onSubmit={handleSubmit}>
                  {/* Email field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
      
                  {/* Password field */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
      
                  {/* Submit Button */}
                  <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                  </div>
      
                  {/* Link to Register */}
                  <div className="mb-3 text-center">
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                  </div>
      
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    
  );
};

export default Login;
