import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', formData);
            localStorage.setItem('token', res.data.token);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
            <form onSubmit={onSubmit}/>)}
