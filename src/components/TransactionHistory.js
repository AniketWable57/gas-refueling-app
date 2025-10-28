import React from 'react';

const TransactionHistory = ({
  transactions,
  gasPrice,
  serviceCharge,
  onClearHistory
}) => {
  return (
    <div className="history-card no-print">
      <h2><i className="fas fa-history"></i> Transaction History</h2>
      
      {transactions.length === 0 ? (
        <div className="empty-history">
          <i className="fas fa-receipt" style={{fontSize: '3rem', marginBottom: '15px', opacity: 0.5}}></i>
          <p>No transactions yet</p>
        </div>
      ) : (
        <>
          {transactions.map(transaction => (
            <div key={transaction.id} className="history-item">
              <div className="history-header">
                <div className="history-name">{transaction.consumerName}</div>
                <div className="history-otp">OTP: {transaction.otp}</div>
              </div>
              <div className="history-details">
                <div className="history-detail">
                  Paid: <span>{transaction.amountPaid} Rs</span>
                </div>
                <div className="history-detail">
                  Change: <span>{transaction.changeAmount} Rs</span>
                </div>
                <div className="history-detail">
                  To Gas Co: <span>{gasPrice} Rs</span>
                </div>
                <div className="history-detail">
                  Profit: <span>{serviceCharge} Rs</span>
                </div>
              </div>
              <div style={{fontSize: '0.8rem', color: '#888', marginTop: '10px'}}>
                {transaction.timestamp}
              </div>
            </div>
          ))}
          
          <div className="action-buttons">
            <button className="danger-btn" onClick={onClearHistory}>
              <i className="fas fa-trash"></i> Clear History
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;