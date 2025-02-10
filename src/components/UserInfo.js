import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7251/api/UsersApi');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch user data');
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`https://localhost:7251/api/UsersApi/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
            } catch (err) {
                console.error('Failed to delete user', err);
            }
        }
    };

    const handleEdit = (userId) => {
        navigate(`/users/edit/${userId}`);
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-3">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-backward"></i> Back
            </button>
            <h2>User Information</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user.id)}>Edit</button>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserInfo;
