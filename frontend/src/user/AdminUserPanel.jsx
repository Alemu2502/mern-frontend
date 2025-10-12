// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Layout from '../core/Layout';
// import { isAuthenticated } from '../auth';
// import { API } from '../config';

// const AdminUserPanel = () => {
//   const [users, setUsers] = useState([]);
//   const [message, setMessage] = useState(null); // ✅ Message state
//   const { user, token } = isAuthenticated();

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const { data } = await axios.get(`${API}/admin/users`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         console.log('Fetched users:', data);

//         if (Array.isArray(data)) {
//           setUsers(data);
//         } else if (data.users && Array.isArray(data.users)) {
//           setUsers(data.users);
//         } else {
//           setUsers([]);
//         }
//       } catch (err) {
//         console.error('Error fetching users:', err);
//         setUsers([]);
//         showMessage('error', 'Failed to load users.');
//       }
//     };

//     loadUsers();
//   }, [token]);

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage(null), 4000); // Auto-clear after 4s
//   };

//   const confirmAction = (message) => window.confirm(message);

//   const deleteUser = async (id) => {
//     if (!confirmAction('Are you sure you want to delete this user?')) return;

//     try {
//       await axios.delete(`${API}/admin/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setUsers(users.filter(u => u._id !== id));
//       showMessage('success', 'User deleted successfully.');
//     } catch (err) {
//       console.error('Error deleting user:', err);
//       showMessage('error', 'Failed to delete user.');
//     }
//   };

//   const updateRole = async (id, role) => {
//     const action = role === 1 ? 'promote to Admin' : 'demote to User';
//     if (!confirmAction(`Are you sure you want to ${action}?`)) return;

//     try {
//       await axios.put(`${API}/admin/users/${id}/role`, { role }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setUsers(users.map(u => u._id === id ? { ...u, role } : u));
//       showMessage('success', `User successfully ${action}d.`);
//     } catch (err) {
//       console.error('Error updating role:', err);
//       showMessage('error', `Failed to ${action} user.`);
//     }
//   };

//   return (
//     <Layout
//       title="Manage Users"
//       description={`Welcome ${user?.name || 'Admin'}`}
//       className="container"
//     >
//       <h2 className="text-xl font-bold mb-4">Registered Users</h2>

//       {/* ✅ Enhanced Message UI */}
//       {message && (
//         <div
//           className={`mb-4 px-4 py-3 rounded-lg flex items-center gap-2 ${
//             message.type === 'success'
//               ? 'bg-green-50 text-green-700 border border-green-300'
//               : 'bg-red-50 text-red-700 border border-red-300'
//           }`}
//         >
//           <span className="text-lg">
//             {message.type === 'success' ? '✅' : '❌'}
//           </span>
//           <span className="font-medium">{message.text}</span>
//         </div>
//       )}

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Verified</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(users) && users.length > 0 ? (
//             users.map(u => (
//               <tr key={u._id}>
//                 <td>{u.email}</td>
//                 <td>{u.isVerified ? '✅' : '❌'}</td>
//                 <td>{u.role === 1 ? 'Admin' : 'User'}</td>
//                 <td>
//                   <button
//                     onClick={() => deleteUser(u._id)}
//                     className="btn btn-danger btn-sm me-2"
//                   >
//                     Delete
//                   </button>
//                   {u.role === 1 ? (
//                     <button
//                       onClick={() => updateRole(u._id, 0)}
//                       className="btn btn-primary btn-sm"
//                     >
//                       Demote
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => updateRole(u._id, 1)}
//                       className={`btn btn-primary btn-sm ${!u.isVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
//                       disabled={!u.isVerified}
//                       title={!u.isVerified ? 'This user must be verified before promotion to Admin.' : ''}
//                     >
//                       Promote
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No users found or failed to load.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </Layout>
//   );
// };

// export default AdminUserPanel;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { API } from '../config';

const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null); // ✅ Message state
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await axios.get(`${API}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Fetched users:', data);

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
    setTimeout(() => setMessage(null), 4000); // Auto-clear after 4s
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
      className="container"
    >
      <h2 className="text-xl font-bold mb-4">Registered Users</h2>

      {/* ✅ Enhanced Message UI */}
      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-300'
              : 'bg-red-50 text-red-700 border border-red-300'
          }`}
        >
          <span className="text-lg">
            {message.type === 'success' ? '✅' : '❌'}
          </span>
          <span className="font-medium">{message.text}</span>
        </div>
      )}

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
                <td className="flex items-center gap-2">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="btn btn-danger btn-sm me-2"
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
                    <>
                      <button
                        onClick={() => updateRole(u._id, 1)}
                        className={`btn btn-primary btn-sm ${!u.isVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!u.isVerified}
                      >
                        Promote
                      </button>
                      {!u.isVerified && (
                        <span
                          className="text-gray-500 text-sm cursor-help"
                          title="This user must be verified before promotion to Admin."
                        >
                          <span role="img" aria-label="Info">❓</span>

                        </span>
                      )}
                    </>
                  )}
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