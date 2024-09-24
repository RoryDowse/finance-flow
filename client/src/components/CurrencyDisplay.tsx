import './CurrencyDisplay.css';
import React from 'react';

interface CurrencyDisplayProps {
  baseCurrencyType: string;
  currentCashflow: number | null;
}

// Creates a card prop that displays the users base currency type and current cashflow
const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ 
  baseCurrencyType, 
  currentCashflow, 
  }) => {
  return (
    <div className="financial-item-container">
      <h3 className="currency-display">Currency Information</h3>
      <p className="info-display">Base Currency Type:</p>
        <p>{baseCurrencyType ? baseCurrencyType : 'N/A'}</p>
      <p className="info-display">Current Cashflow: </p>
        <p>{currentCashflow !== null ? `${currentCashflow.toFixed(0)}` : 'N/A'}</p>
    </div>
  );
};

export default CurrencyDisplay;