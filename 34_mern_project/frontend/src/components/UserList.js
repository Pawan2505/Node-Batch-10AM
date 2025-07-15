import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('/api/admin');
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add">➕ Add User</Link>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.phone}
            <Link to={`/edit/${user._id}`}> ✏️ Edit</Link>
            <button onClick={() => deleteUser(user._id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
