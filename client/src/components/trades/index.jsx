import React from 'react';

const Trades = ({ trades }) => {
      if (trades.length === 0) {
    return <h2>No active trades</h2>;
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
{/* use saved card componetsnt to render cards */}
          </div>
          <div>
            <strong>Requested Cards:</strong>
{/* comment above  */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trades;
