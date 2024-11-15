import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './../../assets/logo.png';

const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');

    if (storedUserId && storedAccessToken && storedRefreshToken) {
      setUserId(storedUserId);
      fetchUserRole(storedUserId);
    } else {
      setUserId(null);
      setRole('');
    }
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/role/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (response.status === 200) {
        setRole(response.data.role);
      }
    } catch (error) {
      console.error('Failed to fetch user role:', error);
    }
  };

  const handleLogout = () => {
    setShowModal(true); 
  };

  const confirmLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
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

  const cancelLogout = () => {
    setShowModal(false);
  };

  const clearUserSession = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userId');
    setUserId(null);
    setRole('');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#320221', height: '7vh' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="d-inline-block align-top" width="40" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>

            {role === 'user' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/movies">
                  Movies
                </Link>
              </li>
            )}
            {role === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            )}

            {userId ? (
              <li className="nav-item">
                <span
                  className="nav-link text-white"
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  Logout ({userId})
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{
              zIndex: 1050, 
            }}
          ></div>

          <div className="modal show" tabIndex="-1" style={{ display: 'block', zIndex: 1060 }} aria-labelledby="logoutModal" aria-hidden="true">
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
                  <button type="button" className="btn btn-secondary" onClick={cancelLogout}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={confirmLogout}>
                    Confirm Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
