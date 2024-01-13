import React, { useState, useEffect } from "react";
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const { loading, data } = useQuery(QUERY_USERS);
  const { loading: loadingUser, data: userData } = useQuery(QUERY_USER, {
    variables: { username: searchParams },
  });

  useEffect(() => {
    if (searchTerm) {
      const newSuggestions = data.users
        .filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((user) => user.username);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsSearchActive(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchParams(searchTerm);
    setIsSearchActive(true);
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
          list="user-suggestions"
        />
        <datalist id="user-suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
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

      {!isSearchActive && selectedUser && (
        <div>
          <h2>{selectedUser.username}'s Cards</h2>
          <SavedCards
            savedCards={selectedUser.savedCards}
            Username={selectedUser.username}
          ></SavedCards>
        </div>
      )}

      {isSearchActive && (
        <div>
          {userData && userData.user ? (
            <>
              <h2>{userData.user.username}'s Cards</h2>
              <SavedCards
                savedCards={userData.user.savedCards}
                Username={userData.user.username}
              ></SavedCards>
            </>
          ) : (
            <h2>User not found</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearchPage;
