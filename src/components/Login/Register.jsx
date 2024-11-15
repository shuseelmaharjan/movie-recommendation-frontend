import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bg from './../../assets/bg1.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage({ type: 'danger', text: "Passwords don't match" });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);

      if (response.status === 201) { 
        setMessage({ type: 'success', text: response.data.message });
      } else {
        setMessage({ type: 'danger', text: response.data.error || 'Something went wrong.' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: 'Invalid Form Data. Please Try again later.' });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "calc(100vh - 7vh)", 
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
            <div className="card shadow-lg border-10"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)", 
                backdropFilter: "blur(10px)", 
              }}
            >
              <div className="card-body px-4 py-5 text-white">
                <h3 className="text-center mb-4">Register</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="first_name" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control bg-transparent text-white border border-gray-500 focus:border-gray-800 focus:ring-0 placeholder-gray-400"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="last_name" className="form-label text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control bg-transparent text-white border border-gray-500 focus:border-white focus:ring-0 placeholder-gray-400"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>
                  <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control bg-transparent text-white border border-gray-500 focus:border-white focus:ring-0 placeholder-gray-400"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control bg-transparent text-white border border-gray-500 focus:border-white focus:ring-0 placeholder-gray-400"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="confirm_password" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control bg-transparent text-white border border-gray-500 focus:border-white focus:ring-0 placeholder-gray-400"
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm your password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-grid mt-4">
                    <button type="submit" className="btn hover:color-black" style={{background:'orange'}}>
                      <strong>Register</strong>
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <p className="mb-0">
                      Already a User?{" "}
                      <Link to="/login" className="text-white">
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
                {message && (
                  <div
                    className={`alert alert-${message.type} mt-3`}
                    role="alert"
                  >
                    {message.text}
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

export default Register;
