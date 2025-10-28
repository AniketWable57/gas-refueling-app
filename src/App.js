import React, { useState, useEffect, useRef } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionResult from './components/TransactionResult';
import BusinessSummary from './components/BusinessSummary';
import TransactionHistory from './components/TransactionHistory';
import InstallPrompt from './components/InstallPrompt';
import Report from './components/Report';

const GAS_PRICE = 870;
const SERVICE_CHARGE = 30;
const TOTAL_PER_CYLINDER = GAS_PRICE + SERVICE_CHARGE;

function App() {
  const [consumerName, setConsumerName] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [otp, setOtp] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const amountPaidNum = parseFloat(amountPaid) || 0;
  const changeAmount = amountPaidNum > TOTAL_PER_CYLINDER ? amountPaidNum - TOTAL_PER_CYLINDER : 0;

  // Load transactions from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('gasMediatorTransactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem('gasMediatorTransactions', JSON.stringify(transactions));
  }, [transactions]);

  // PWA Installation Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      
      setTimeout(() => {
        if (!window.matchMedia('(display-mode: standalone)').matches) {
          setShowInstallPrompt(true);
        }
      }, 3000);
    };
    
    const handleAppInstalled = () => {
      setInstallPrompt(null);
      setShowInstallPrompt(false);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!consumerName || !amountPaid || !otp) {
      alert('Please fill in all fields');
      return;
    }
    
    if (amountPaidNum < TOTAL_PER_CYLINDER) {
      alert(`Amount paid must be at least ${TOTAL_PER_CYLINDER} Rs`);
      return;
    }
    
    const newTransaction = {
      id: Date.now(),
      consumerName,
      amountPaid: amountPaidNum,
      otp,
      changeAmount,
      timestamp: new Date().toLocaleString()
    };
    
    setTransactions([newTransaction, ...transactions]);
    setShowResults(true);
  };

  const handleReset = () => {
    setConsumerName('');
    setAmountPaid('');
    setOtp('');
    setShowResults(false);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all transaction history?')) {
      setTransactions([]);
    }
  };

  const handleInstallClick = () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    
    installPrompt.userChoice.then((choiceResult) => {
      setInstallPrompt(null);
      setShowInstallPrompt(false);
    });
  };

  const handleCloseInstall = () => {
    setShowInstallPrompt(false);
  };

  return (
    <div className="container">
      <header className="no-print">
        <h1><i className="fas fa-fire"></i> Gas Mediator</h1>
        <p>Your trusted gas service intermediary</p>
      </header>
      
      <TransactionForm
        consumerName={consumerName}
        setConsumerName={setConsumerName}
        amountPaid={amountPaid}
        setAmountPaid={setAmountPaid}
        otp={otp}
        setOtp={setOtp}
        totalPerCylinder={TOTAL_PER_CYLINDER}
        onSubmit={handleSubmit}
      />
      
      {showResults && (
        <TransactionResult
          consumerName={consumerName}
          otp={otp}
          amountPaid={amountPaidNum}
          changeAmount={changeAmount}
          gasPrice={GAS_PRICE}
          serviceCharge={SERVICE_CHARGE}
          onReset={handleReset}
          onClose={() => setShowResults(false)}
        />
      )}
      
      <BusinessSummary
        transactions={transactions}
        gasPrice={GAS_PRICE}
        serviceCharge={SERVICE_CHARGE}
        onGeneratePDF={() => {/* PDF logic */}}
        onPrintReport={() => setShowReport(true)}
      />
      
      <TransactionHistory
        transactions={transactions}
        gasPrice={GAS_PRICE}
        serviceCharge={SERVICE_CHARGE}
        onClearHistory={handleClearHistory}
      />
      
      {showReport && (
        <Report
          transactions={transactions}
          gasPrice={GAS_PRICE}
          serviceCharge={SERVICE_CHARGE}
          onClose={() => setShowReport(false)}
        />
      )}
      
      <footer className="no-print">
        <p>Gas Mediator App &copy; {new Date().getFullYear()}</p>
        <p>Gas Price: {GAS_PRICE} Rs | Service Charge: {SERVICE_CHARGE} Rs</p>
      </footer>
      
      <InstallPrompt
        show={showInstallPrompt}
        onInstall={handleInstallClick}
        onClose={handleCloseInstall}
      />
    </div>
  );
}

export default App;