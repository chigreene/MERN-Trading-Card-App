import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USERS, QUERY_USER } from "../../utils/queries";
import SavedCards from "../components/savedCards";
import Auth from "../../utils/auth";
import "./UserSearchPage.css";

const UserSearchPage = () => {
  const profile = Auth.getProfile();
  const username = profile?.data?.username;

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useState("");

  const { loading, data } = useQuery(QUERY_USERS);
  const { loading: loadingUser, data: userData } = useQuery(QUERY_USER, {
    variables: { username: searchParams },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchParams(searchTerm);
  };

  console.log("Search input", searchParams);
  console.log("selected User", userData);

  return (
    <div className="container">
      <h1>Search Other Users Collections</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users
            .filter((user) => user.username !== username)
            .map((user) => (
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
