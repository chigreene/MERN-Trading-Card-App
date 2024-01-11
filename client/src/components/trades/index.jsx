import React from "react";
import SavedCards from "../savedCards";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../../../utils/queries";
import { CHANGE_TRADE_STATUS } from "../../../utils/mutations";
import Auth from "../../../utils/auth";

const Trades = () => {
  const profile = Auth.getProfile();

  const username = profile?.data?.username || "";

  const { loading, data } = useQuery(QUERY_USER, {
    fetchPolicy: "no-cache",
    variables: { username: username },
  });

  const [changeTradeStatus] = useMutation(CHANGE_TRADE_STATUS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userTrades = data?.user?.trades || [];


  if (userTrades.length === 0) {
    return <h1>No active trades</h1>;
  }

  const onClick = async (tradeId, update) => {
    try {
      await changeTradeStatus({
        variables: { id: tradeId, status: update },
      });

      // Refresh the page after the mutation is executed
      window.location.reload();
    } catch (error) {
      console.error("Error updating trade status:", error);
    }
  };

  return (
    <div>
      <h2>User Trades</h2>
      {userTrades.map((trade) => (
        <div key={trade._id} className="trade-item">
          <h3>Status: {trade.status}</h3>

{username === trade.recipient.username && (
  <div>
    <button
      type="button"
      className="btn btn-success"
      onClick={() => onClick(trade._id, 'accepted')}
    >
      Accept
    </button>
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => onClick(trade._id, 'rejected')}
    >
      Reject
    </button>
  </div>
)}

          <p>Trader: {trade.trader.username}</p>
          <p>Recipient: {trade.recipient.username}</p>
          <div>
            <strong>Offered Cards:</strong>
            <SavedCards savedCards={trade.offeredCard} />
          </div>
          <div>
            <strong>Requested Cards:</strong>
            <SavedCards savedCards={trade.requestedCard} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trades;
