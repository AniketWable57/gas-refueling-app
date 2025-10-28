import React, { useRef, useEffect } from 'react';

const Report = ({ transactions, gasPrice, serviceCharge, onClose }) => {
  const reportRef = useRef();
  
  const totalMoneyFromConsumers = transactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0);
  const totalProfit = transactions.length * serviceCharge;
  const totalToGasCompany = transactions.length * gasPrice;
  const totalChangeGiven = transactions.reduce((sum, transaction) => sum + transaction.changeAmount, 0);

  useEffect(() => {
    const handlePrint = () => {
      window.print();
      setTimeout(() => {
        onClose();
      }, 500);
    };

    handlePrint();
  }, [onClose]);

  return (
    <div id="print-report" ref={reportRef}>
      <div className="report-container">
        <div className="report-header">
          <h1 className="report-title">Gas Mediator - Kalpana Wable</h1>
          <p className="report-subtitle">Your trusted gas service intermediary</p>
          <p className="report-date">Generated on: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="profit-highlight">
          <div className="profit-label">Total Profit</div>
          <div className="profit-amount">{totalProfit} Rs</div>
          <div>from {transactions.length} transactions</div>
        </div>
        
        <div className="report-grid">
          <div className="report-summary">
            <h3><i className="fas fa-chart-line"></i> Business Summary</h3>
            <div className="summary-item">
              <div className="summary-label">Total Transactions</div>
              <div className="summary-value">{transactions.length}</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Money from Consumers</div>
              <div className="summary-value">{totalMoneyFromConsumers} Rs</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">To Gas Company</div>
              <div className="summary-value">{totalToGasCompany} Rs</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Total Change Given</div>
              <div className="summary-value">{totalChangeGiven} Rs</div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Total Profit</div>
              <div className="summary-value">{totalProfit} Rs</div>
            </div>
          </div>
          
          <div className="report-transactions">
            <h3><i className="fas fa-receipt"></i> Recent Transactions</h3>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Consumer</th>
                  <th>OTP</th>
                  <th>Paid</th>
                  <th>Change</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 10).map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.consumerName}</td>
                    <td>{transaction.otp}</td>
                    <td>{transaction.amountPaid} Rs</td>
                    <td>{transaction.changeAmount} Rs</td>
                    <td>{transaction.timestamp.split(',')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {transactions.length > 10 && (
              <p style={{textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#666'}}>
                ... and {transactions.length - 10} more transactions
              </p>
            )}
          </div>
        </div>
        
        <div className="report-footer">
          <p>Gas Mediator App - Your trusted gas service intermediary</p>
          <p>Gas Price: {gasPrice} Rs | Service Charge: {serviceCharge} Rs | Total per Cylinder: {gasPrice + serviceCharge} Rs</p>
        </div>
      </div>
    </div>
  );
};

export default Report;