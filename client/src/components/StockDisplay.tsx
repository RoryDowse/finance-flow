import './StockDisplay.css';
import React from 'react';

interface StockDisplayProps {
  ticker: string;
  recentCloseDate: string | null;
  recentClosePrice: number | null;
  recentTenYearsAgoDate: string | null;
  recentTenYearsAgoClose: number | null;
}

const StockDisplay: React.FC<StockDisplayProps> = ({ 
  ticker, 
  recentCloseDate, 
  recentClosePrice, 
  recentTenYearsAgoDate, 
  recentTenYearsAgoClose 
}) => {
  // Render component and handle cases where values are null or undefined
  return (
    <div className="financial-item-container">
      <h3 className="ticker-display">Stock Information</h3>
      <p className="info-display">Ticker:</p>
        <p>{ticker ? ticker : 'N/A'}</p>
      <p className="info-display">Recent Close Date: </p>
        <p>{recentCloseDate ? recentCloseDate : 'N/A'}</p>
      <p className="info-display">Recent Close Price: </p>
        <p>{recentClosePrice !== null ? `$${recentClosePrice.toFixed(2)}` : 'N/A'}</p>
      <p className="info-display">10 Years Ago Date:</p>
        <p>{recentTenYearsAgoDate ? recentTenYearsAgoDate : 'N/A'}</p>
      <p className="info-display">10 Years Ago Close Price:</p>
        <p>{recentTenYearsAgoClose !== null ? `$${recentTenYearsAgoClose.toFixed(2)}` : 'N/A'}</p>
    </div>
  );
};

export default StockDisplay;
