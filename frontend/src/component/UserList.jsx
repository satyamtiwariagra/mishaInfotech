import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => {
      console.log("✅ Users API Response:", res.data); // Debug log
      setUsers(res.data.content); // ✅ FIX: extract content array
    });
  }, []);

  return (
    <div className="container mt-4">
      <h3>📋 Registered Users</h3>

      {users.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name (Email)</th>
              <th>Gender</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.email ? (
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  ) : (
                    user.name
                  )}
                </td>
                <td>{user.gender}</td>
                <td>{user.state?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
