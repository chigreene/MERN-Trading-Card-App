import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import SavedCards from "../components/savedCards";

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
    <div>
      <h1>User Search Page</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => (
            <tr key={user._id} onClick={() => handleUserClick(user)}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div>
          <h2>{selectedUser.username}'s Cards</h2>
          <SavedCards savedCards={selectedUser.savedCards}></SavedCards>
        </div>
      )}
    </div>
  );
};

export default UserSearchPage;
