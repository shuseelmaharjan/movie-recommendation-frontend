import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 bg-light p-4">
          <h1 className="display-4">Dashboard</h1>
          <p>Welcome to the dashboard! This is your main content area.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
