import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/search');
        setJobs(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.map((job) => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Location: {job.location}</p>
          <p>Job Type: {job.jobType}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
