import './CurrencyDisplay.css';
import React from 'react';

interface CurrencyDisplayProps {
  baseCurrencyType: string;
  currentCashflow: number | null;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ 
  baseCurrencyType, 
  currentCashflow, 
}) => {
  // Render component and handle cases where values are null or undefined
  return (
    <div className="financial-item-container">
      <h3 className="currency-display">Currency Information</h3>
      <p className="info-display">Base Currency Type:</p>
        <p>{baseCurrencyType ? baseCurrencyType : 'N/A'}</p>
      <p className="info-display">Current Cash Flow: </p>
        <p>{currentCashflow !== null ? `$${currentCashflow.toFixed(2)}` : 'N/A'}</p>
    </div>
  );
};

export default CurrencyDisplay;