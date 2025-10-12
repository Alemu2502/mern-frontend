import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { API } from '../config';

const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setUsers([]);
        showMessage('error', 'Failed to load users.');
      }
    };

    loadUsers();
  }, [token]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const confirmAction = (message) => window.confirm(message);

  const deleteUser = async (id) => {
    if (!confirmAction('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`${API}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.filter(u => u._id !== id));
      showMessage('success', 'User deleted successfully.');
    } catch (err) {
      console.error('Error deleting user:', err);
      showMessage('error', 'Failed to delete user.');
    }
  };

  const updateRole = async (id, role) => {
    const action = role === 1 ? 'promote to Admin' : 'demote to User';
    if (!confirmAction(`Are you sure you want to ${action}?`)) return;

    try {
      await axios.put(`${API}/admin/users/${id}/role`, { role }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.map(u => u._id === id ? { ...u, role } : u));
      showMessage('success', `User successfully ${action}d.`);
    } catch (err) {
      console.error('Error updating role:', err);
      showMessage('error', `Failed to ${action} user.`);
    }
  };

  return (
    <Layout
      title="Manage Users"
      description={`Welcome ${user?.name || 'Admin'}`}
      className="container-fluid"
    >
      <h2 className="mb-4 fw-bold">Registered Users</h2>

      {message && (
        <div
          className={`mb-4 px-3 py-2 rounded d-flex align-items-center gap-2 ${
            message.type === 'success'
              ? 'bg-success text-white border border-success'
              : 'bg-danger text-white border border-danger'
          }`}
        >
          <span className="fs-5" role="img" aria-label={message.type === 'success' ? 'Success' : 'Error'}>
            {message.type === 'success' ? '✅' : '❌'}
          </span>
          <span className="fw-semibold">{message.text}</span>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Email</th>
              <th>Verified</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map(u => (
                <tr key={u._id}>
                  <td>{u.email}</td>
                  <td>{u.isVerified ? '✅' : '❌'}</td>
                  <td>{u.role === 1 ? 'Admin' : 'User'}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
                      <button
                        onClick={() => deleteUser(u._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                      {u.role === 1 ? (
                        <button
                          onClick={() => updateRole(u._id, 0)}
                          className="btn btn-primary btn-sm"
                        >
                          Demote
                        </button>
                      ) : (
                        <div className="position-relative d-inline-block">
                          <button
                            onClick={() => updateRole(u._id, 1)}
                            className={`btn btn-primary btn-sm pe-4 ${!u.isVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!u.isVerified}
                          >
                            Promote
                          </button>
                          {!u.isVerified && (
                            <span
                              className="position-absolute top-0 end-0 translate-middle-y bg-light text-secondary rounded-circle px-1"
                              role="img"
                              aria-label="Info"
                              title="This user must be verified before promotion to Admin."
                              style={{ pointerEvents: 'auto' }}
                            >
                              ❓
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found or failed to load.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminUserPanel;
