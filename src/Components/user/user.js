import React from 'react';

function User({ users }) {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Available: {user.available ? 'Yes' : 'No'}</p>
            {/* Add more user information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
