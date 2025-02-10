import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://localhost:7251/api/UsersApi/${id}`);
                setUser(response.data);
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://localhost:7251/api/UsersApi/${id}`, user);
            navigate('/userinfo');
        } catch (err) {
            console.error('Failed to update user', err);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-backward"></i> Back
            </button>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Address</label>
                    <input type="text" className="form-control" name="address" value={user.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>City</label>
                    <input type="text" className="form-control" name="city" value={user.city} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Pincode</label>
                    <input type="text" className="form-control" name="pincode" value={user.pincode} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Mobile</label>
                    <input type="text" className="form-control" name="mobile" value={user.mobile} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required />
                </div>
                <div className="mb-3 form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        name="isAdmin" 
                        checked={user.isAdmin} 
                        onChange={(e) => setUser({ ...user, isAdmin: e.target.checked })} 
                    />
                    <label className="form-check-label">Is Admin</label>
                </div>
                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
        </div>
    );
};

export default UserEdit;
