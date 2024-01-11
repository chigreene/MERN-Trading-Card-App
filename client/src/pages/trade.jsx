import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRADE } from "../../utils/mutations";
import "./trade.css";
import Trades from "../components/trades";
import Auth from "../../utils/auth";
function TradePage() {
  const profile = Auth.getProfile();
  const username = profile?.data?.username || "";
  const [formState, setFormState] = useState({
    trader: username,
    recipient: "",
    offeredCard: "",
    requestedCard: "",
  });

  const [createTrade] = useMutation(CREATE_TRADE, {
    variables: formState,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    createTrade();
  };
  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <h1>Trade Page</h1>
          <Trades></Trades>
          <form onSubmit={handleFormSubmit}>
            <input
              name="trader"
              value={formState.trader}
              type="text"
              placeholder="Trader"
            />
            <input
              name="recipient"
              value={formState.recipient}
              onChange={handleInputChange}
              type="text"
              placeholder="Recipient"
            />
            <input
              name="offeredCard"
              value={formState.offeredCard}
              onChange={handleInputChange}
              type="text"
              placeholder="Offered Card"
            />
            <input
              name="requestedCard"
              value={formState.requestedCard}
              onChange={handleInputChange}
              type="text"
              placeholder="Requested Card"
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <h1>Must Be Logged In</h1>
      )}
    </>
  );
}

export default TradePage;
