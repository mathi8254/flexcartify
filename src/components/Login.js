import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        emailOrMobile: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7251/api/AccountApi/login', formData);
            alert('Login successful!');
            onLogin(response.data);
            navigate('/'); 
        } catch (error) {
            console.error(error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container-sm" style={{ marginTop: "150px", marginBottom: "150px", padding: "80px", width: "700px" }}>
            <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Login</h2>
                <label>Enter Email id or Mobile no:</label>
                <input type="text" className="form-control" name="emailOrMobile" placeholder="Email or Mobile" onChange={handleChange} required />
                <br />
                <label>Enter Password:</label>
                <input type="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} required />
                <br />
                <button type="submit" className='btn btn-primary'>Login</button>
                <div className="mt-3">
                    <Link to="/register">New User? Create an account</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
