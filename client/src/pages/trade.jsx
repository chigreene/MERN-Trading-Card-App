import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TRADE } from "../../utils/mutations";
import "./trade.css";
import { QUERY_USERS } from "../../utils/queries";
import CreateTrade from "../components/createTrade";
import Trades from "../components/trades";
import Auth from "../../utils/auth";

function TradePage() {
  
  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <CreateTrade></CreateTrade>
        <Trades></Trades>
        </>
      ) : (
        <h1>Must Be Logged In</h1>
      )}
    </>
  );
}

export default TradePage;
