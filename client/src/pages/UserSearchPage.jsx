import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import SavedCards from "../components/savedCards";
import "./UserSearchPage.css";

const UserSearchPage = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  console.log("selected User", selectedUser);

  return (
    <div className="container">
      <h1>User Search Page</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => (
            <tr
              className="userRow"
              key={user._id}
              onClick={() => handleUserClick(user)}
            >
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div>
          <h2>{selectedUser.username}'s Cards</h2>
          <SavedCards
            savedCards={selectedUser.savedCards}
            Username={selectedUser.username}
          ></SavedCards>
        </div>
      )}
    </div>
  );
};

export default UserSearchPage;
