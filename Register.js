import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'job-seeker' });
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', formData);
      localStorage.setItem('token', response.data.token);
      history.push('/dashboard');  // Redirect to dashboard after registration
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="job-seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
