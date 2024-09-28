import React, { useState } from 'react';
import axios from 'axios';

const JobSearch = ({ setJobs }) => {
  const [filters, setFilters] = useState({ jobType: '', location: '' });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('/search', { params: filters });
      setJobs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Job Search</h2>
      <select name="jobType" onChange={handleChange}>
        <option value="">Select Job Type</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="remote">Remote</option>
      </select>
      <input type="text" name="location" placeholder="Location" onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default JobSearch;
