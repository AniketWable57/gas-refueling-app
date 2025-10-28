import React from 'react';

const TransactionResult = ({
  consumerName,
  otp,
  amountPaid,
  changeAmount,
  gasPrice,
  serviceCharge,
  onReset,
  onClose
}) => {
  return (
    <div className="result-card no-print">
      <h2><i className="fas fa-file-invoice-dollar"></i> Transaction Result</h2>
      <div className="result-item">
        <div className="result-label">Consumer Name:</div>
        <div className="result-value">{consumerName}</div>
      </div>
      <div className="result-item">
        <div className="result-label">OTP:</div>
        <div className="result-value">{otp}</div>
      </div>
      <div className="result-item">
        <div className="result-label">Amount Paid:</div>
        <div className="result-value">{amountPaid} Rs</div>
      </div>
      <div className="result-item">
        <div className="result-label">Change to Return:</div>
        <div className="result-value">{changeAmount} Rs</div>
      </div>
      <div className="result-item">
        <div className="result-label">To Gas Company:</div>
        <div className="result-value">{gasPrice} Rs</div>
      </div>
      <div className="result-item">
        <div className="result-label">Your Profit:</div>
        <div className="result-value">{serviceCharge} Rs</div>
      </div>
      
      <div className="action-buttons">
        <button className="secondary-btn" onClick={onReset}>
          <i className="fas fa-redo"></i> New Transaction
        </button>
        <button onClick={onClose}>
          <i className="fas fa-times"></i> Close
        </button>
      </div>
    </div>
  );
};

export default TransactionResult;