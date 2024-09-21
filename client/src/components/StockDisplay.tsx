import './StockDisplay.css';

interface StockDisplayProps {
    ticker: string;
    displayDate: string;
}

const StockDisplay = ({ ticker, displayDate }: StockDisplayProps) => {
    return (
        <div className="financial-item-display">
            <h4 className="ticker-display">{ticker !== null ? ticker : 'N/A'}</h4>
            <p className="date-display">{displayDate !== null ? displayDate : 'N/A'}</p>
        </div>
    );
};

export default StockDisplay;