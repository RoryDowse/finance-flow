interface StockDisplayProps {
    ticker: string;
    displayDate: string;
}

const StockDisplay = ({ ticker, displayDate }: StockDisplayProps) => {
    return (
        <div className="stock-display">
            <h3>{ticker !== null ? ticker : 'N/A'}</h3>
            <p>{displayDate !== null ? displayDate : 'N/A'}</p>
        </div>
    );
};

export default StockDisplay;