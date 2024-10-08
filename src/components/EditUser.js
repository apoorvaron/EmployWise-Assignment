import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser, fetchUsers } from '../services/api';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetchUsers(1);
                const userData = response.data.data.find((u) => u.id === parseInt(id));
                if (userData) {
                    setUser(userData);
                } else {
                    setMessage('User not found.');
                    setTimeout(() => navigate('/users'), 1500);
                }
            } catch (error) {
                setMessage('Failed to fetch user details.');
            }
        };
        getUser();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, user);
            setMessage('User updated successfully.');
            setTimeout(() => navigate('/users'), 1500);
        } catch (error) {
            setMessage('Failed to update user.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Edit User</h2>
                {message && (
                    <div className={`alert alert-${message.includes('Failed') ? 'danger' : 'success'} alert-dismissible fade show`} role="alert">
                        {message}
                    </div>
                )}
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={user.first_name}
                            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={user.last_name}
                            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;