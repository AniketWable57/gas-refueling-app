import React from 'react';

const BusinessSummary = ({
  transactions,
  gasPrice,
  serviceCharge,
  onGeneratePDF,
  onPrintReport
}) => {
  const totalMoneyFromConsumers = transactions.reduce((sum, transaction) => sum + transaction.amountPaid, 0);
  const totalProfit = transactions.length * serviceCharge;
  const totalToGasCompany = transactions.length * gasPrice;
  const totalChangeGiven = transactions.reduce((sum, transaction) => sum + transaction.changeAmount, 0);

  return (
    <div className="summary-card no-print">
      <h2><i className="fas fa-chart-line"></i> Business Summary</h2>
      <div className="result-item">
        <div className="result-label">Total Transactions:</div>
        <div className="result-value">{transactions.length}</div>
      </div>
      <div className="result-item">
        <div className="result-label">Money from Consumers:</div>
        <div className="result-value">{totalMoneyFromConsumers} Rs</div>
      </div>
      <div className="result-item">
        <div className="result-label">To Gas Company:</div>
        <div className="result-value">{totalToGasCompany} Rs</div>
      </div>
      <div className="result-item">
        <div className="result-label">Your Total Profit:</div>
        <div className="result-value">{totalProfit} Rs</div>
      </div>
      
      {transactions.length > 0 && (
        <div className="action-buttons" style={{marginTop: '25px'}}>
          <button className="success-btn" onClick={onGeneratePDF}>
            <i className="fas fa-file-pdf"></i> Export PDF
          </button>
          <button className="secondary-btn" onClick={onPrintReport}>
            <i className="fas fa-print"></i> Print Report
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessSummary;