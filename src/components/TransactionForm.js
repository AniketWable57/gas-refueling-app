import React from 'react';

const TransactionForm = ({
  consumerName,
  setConsumerName,
  amountPaid,
  setAmountPaid,
  otp,
  setOtp,
  totalPerCylinder,
  onSubmit
}) => {
  return (
    <div className="card no-print">
      <h2><i className="fas fa-gas-pump"></i> Enter Transaction Details</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="consumerName">Consumer Name</label>
          <input
            type="text"
            id="consumerName"
            value={consumerName}
            onChange={(e) => setConsumerName(e.target.value)}
            placeholder="Enter consumer name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amountPaid">Amount Paid (Rs)</label>
          <input
            type="number"
            id="amountPaid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            placeholder="Enter amount paid"
            min={totalPerCylinder}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>
        
        <button type="submit">
          <i className="fas fa-calculator"></i> Calculate Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;