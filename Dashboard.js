import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/profile">View Profile</Link>
      <Link to="/jobs">View Jobs</Link>
    </div>
  );
};

export default Dashboard;
