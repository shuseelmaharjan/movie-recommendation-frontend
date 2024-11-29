import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', file: null });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('file', formData.file);

    try {
      await axios.post('http://localhost:8000/api/datasets', data);
      setMessage('Dataset added successfully!');
      setMessageType('success');
      toggleModal();
      setFormData({ name: '', file: null });
    } catch (error) {
      setMessage('Failed to add dataset. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-md-9 col-lg-10 bg-light p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Dashboard</h5>
            <button className="btn btn-primary" onClick={toggleModal}>
              Add Dataset
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`alert ${
                messageType === 'success' ? 'alert-success' : 'alert-danger'
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* Dataset Table */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">S.N.</th>
                  <th scope="col">Dataset Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sample Dataset 1</td>
                  <td>
                    <button className="btn btn-sm btn-info mx-1">View</button>
                    <button className="btn btn-sm btn-warning mx-1">Edit</button>
                    <button className="btn btn-sm btn-danger mx-1">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Sample Dataset 2</td>
                  <td>
                    <button className="btn btn-sm btn-info mx-1">View</button>
                    <button className="btn btn-sm btn-warning mx-1">Edit</button>
                    <button className="btn btn-sm btn-danger mx-1">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1040,
              }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Dataset</h5>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      {/* Dataset Name Field */}
                      <div className="form-group">
                        <label htmlFor="datasetName">Dataset Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="datasetName"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter dataset name"
                          required
                        />
                      </div>
                      {/* File Upload Field */}
                      <div className="form-group">
                        <label htmlFor="datasetFile">Upload CSV File</label>
                        <input
                          type="file"
                          className="form-control-file"
                          id="datasetFile"
                          name="file"
                          accept=".csv"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                          Save Dataset
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={toggleModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
