import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetchUsers(page);
                setUsers(response.data.data);
                setTotalPages(response.data.total_pages);
                setMessage(null);
            } catch (error) {
                setMessage('Failed to fetch users.');
                setMessageType('danger');
            }
        };
        getUsers();
    }, [page]);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user.id !== id));
            setMessage('User deleted successfully.');
            setMessageType('success');
        } catch (error) {
            setMessage('Failed to delete user.');
            setMessageType('danger');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>User List</h2>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {message && (
                <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
                    {message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setMessage(null)}
                        aria-label="Close"
                    ></button>
                </div>
            )}
            <div className="row">
                {users.map((user) => (
                    <div className="col-md-4 mb-4" key={user.id}>
                        <div className="card">
                            <img
                                src={user.avatar}
                                className="card-img-top img-fluid"
                                alt={`${user.first_name} ${user.last_name}`}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '0 auto' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {user.first_name} {user.last_name}
                                </h5>
                                <p className="card-text">{user.email}</p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/edit/${user.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="align-self-center">Page {page} of {totalPages}</span>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersList;