import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './../../assets/logo.png';

const Navbar = () => {
  const [userId, setUserId] = useState(null);  // Store userId
  const [role, setRole] = useState('');  // Store user role
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const navigate = useNavigate();  // For navigation

  // Check for tokens and userId on initial load and when the localStorage is updated
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');

    if (storedUserId && storedAccessToken && storedRefreshToken) {
      setUserId(storedUserId);  // Set userId when logged in
      fetchUserRole(storedUserId);  // Fetch role if user is logged in
    } else {
      setUserId(null);  // Clear userId if tokens are not found
      setRole('');  // Reset role
    }
  }, []);  // This effect runs only once when the component mounts

  // Fetch user role from the backend
  const fetchUserRole = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/role/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.status === 200) {
        setRole(response.data.role);  // Set role based on response
      }
    } catch (error) {
      console.error('Failed to fetch user role:', error);
    }
  };

  // Logout function (will trigger modal)
  const handleLogout = () => {
    setShowModal(true);  // Show the confirmation modal
  };

  // Confirm logout
  const confirmLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        // No refresh token, log out locally
        clearUserSession();
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:8000/api/logout',
        { refresh_token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      if (response.status === 200) {
        setShowModal(false);
        clearUserSession();
        navigate('/login');
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Cancel logout (hide modal)
  const cancelLogout = () => {
    setShowModal(false);  // Hide the modal
  };

  // Clear user session (remove tokens and userId from localStorage)
  const clearUserSession = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    setUserId(null);  // Update state
    setRole('');  // Clear role
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{backgroundColor:'#4f0043'}}>
      <div className="container">
        <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" className="d-inline-block align-top" width="40" />
        </Link>


        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">About</Link>
            </li>
            
            {/* Conditionally render navigation based on role */}
            {role === 'user' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/movies">Movies</Link>
              </li>
            )}
            {role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
              </li>
            )}

            {userId ? (
              <li className="nav-item">
                <span className="nav-link text-white" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                  Logout ({userId})
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bootstrap Modal for Logout Confirmation */}
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="logoutModal" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModal">Confirm Logout</h5>
                <button type="button" className="btn-close" onClick={cancelLogout} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to logout?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelLogout}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmLogout}>Confirm Logout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
