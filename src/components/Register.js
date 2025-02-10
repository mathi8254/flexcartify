// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';


const Register = () => {
    const [userFormData, setUserFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        pincode: '',
        mobile: '',
        email: '',
        password: '',
        isAdmin: false,
    });
         
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserFormData({
            ...userFormData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7251/api/AccountApi/register', userFormData);
            alert('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Registration failed. Please check your input.');
        }
    };

    return (
        <div>
            <form className="container-sm" onSubmit={handleUserSubmit} style={{marginTop: "20px"}}>
                <br/>
                <h2 style={{textAlign: 'center'}}>Register</h2>
                <br />
                <label>First Name:</label>
                <input type="text" name="firstName" className="form-control" placeholder="First Name" onChange={handleUserChange} required />
                <br />
                <label>Last Name:</label>
                <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={handleUserChange} required />
                <br />
                <label>Address:</label>
                <input type="text" name="address" className="form-control" placeholder="Address" onChange={handleUserChange} required />
                <br />
                <label>City:</label>
                <input type="text" name="city" className="form-control" placeholder="City" onChange={handleUserChange} required />
                <br />
                <label>Pincode:</label>
                <input type="text" name="pincode" className="form-control" placeholder="Pincode" onChange={handleUserChange} required />
                <br />
                <label>Mobile:</label>
                <input type="text" name="mobile" className="form-control" placeholder="Mobile" onChange={handleUserChange} required />
                <br />
                <label>Email:</label>
                <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleUserChange} required />
                <br />
                <label>Password:</label>
                <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleUserChange} required />
                <br />
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        name="isAdmin" 
                        className="form-check-input" 
                        checked={userFormData.isAdmin} 
                        onChange={handleUserChange} 
                    />
                    <label className="form-check-label">Register as Admin</label>
                </div>
                <br />
                <button type="submit" className="btn btn-primary" >Register</button>
                &nbsp;
                &nbsp;
                &nbsp;
                <Link to="/login">Existing User? Log in</Link>
                <br/>
                <br/>
                {/* <Link to="/login">Existing User? Log in</Link> */}
                <br/>

            </form>
            <br/>
        </div>
    );
};

export default Register;
