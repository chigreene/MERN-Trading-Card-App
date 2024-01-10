import React from 'react';
import SavedCards from '../savedCards';
const Trades = ({ trades }) => {
      if (trades.length === 0) {
    return <h1>No active trades</h1>;
  }
  return (
    <div>
      <h2>User Trades:</h2>
      {trades.map((trade) => (
        <div key={trade._id} className="trade-item">
          <h3>Status: {trade.status}</h3>
          <p>
            <strong>Trader:</strong> {trade.trader.username}
          </p>
          <p>
            <strong>Recipient:</strong> {trade.recipient.username}
          </p>
          <div>
            <strong>Offered Cards:</strong>
            <SavedCards savedCards={trade.offeredCard}></SavedCards>
{/* use saved card componetsnt to render cards */}
          </div>
          <div>
            <strong>Requested Cards:</strong>
             <SavedCards savedCards={trade.requestedCard }></SavedCards>
{/* comment above  */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trades;
