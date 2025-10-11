import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/admin/users');
    setUsers(data.users);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/users/${id}`);
    fetchUsers();
  };

  const updateRole = async (id, role) => {
    await axios.put(`/api/admin/users/${id}/role`, { role });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Registered Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Email</th>
            <th>Verified</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-t">
              <td>{u.email}</td>
              <td>{u.isVerified ? '✅' : '❌'}</td>
              <td>{u.role === 1 ? 'Admin' : 'User'}</td>
              <td>
                <button onClick={() => deleteUser(u._id)} className="text-red-600 mr-2">Delete</button>
                <button onClick={() => updateRole(u._id, u.role === 1 ? 0 : 1)} className="text-blue-600">
                  {u.role === 1 ? 'Demote' : 'Promote'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserPanel;