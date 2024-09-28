import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setProfile(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <h3>Role: {profile.role}</h3>
      {profile.role === 'job-seeker' && (
        <div>
          <h4>Applied Jobs:</h4>
          {profile.profile.jobSeekerProfile.appliedJobs.map((job) => (
            <p key={job._id}>{job.title}</p>
          ))}
        </div>
      )}
      {profile.role === 'employer' && (
        <div>
          <h4>Job Listings:</h4>
          {profile.profile.employerProfile.jobListings.map((job) => (
            <p key={job._id}>{job.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
