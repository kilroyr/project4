import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch list of all users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/allusers",
          {
            method: "GET",
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        // Handle error, maybe redirect to login page
        navigate("/login");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <table className="border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">SL No</th>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-200 p-2">{index + 1}</td>
                <td className="border border-gray-200 p-2">{user.name}</td>
                <td className="border border-gray-200 p-2">{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-200 p-2" colSpan="3">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllUser;
