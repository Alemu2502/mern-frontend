import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await axios.get('/api/admin/users', {
          headers: {
            Authorization: token
          }
        });
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setUsers([]);
      }
    };

    loadUsers();
  }, [token]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`, {
        headers: {
          Authorization: token
        }
      });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await axios.put(`/api/admin/users/${id}/role`, { role }, {
        headers: {
          Authorization: token
        }
      });
      setUsers(users.map(u => u._id === id ? { ...u, role } : u));
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  return (
    <Layout
      title="Manage Users"
      description={`Welcome ${user?.name || 'Admin'}`}
      className="container"
    >
      <h2 className="text-xl font-bold mb-4">Registered Users</h2>
      <table className="table table-bordered">
        <thead>
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
                  <button onClick={() => deleteUser(u._id)} className="btn btn-danger btn-sm me-2">Delete</button>
                  <button onClick={() => updateRole(u._id, u.role === 1 ? 0 : 1)} className="btn btn-primary btn-sm">
                    {u.role === 1 ? 'Demote' : 'Promote'}
                  </button>
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
    </Layout>
  );
};

export default AdminUserPanel;