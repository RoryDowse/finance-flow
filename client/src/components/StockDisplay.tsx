interface StockDisplayProps {
    ticker: string;
    displayDate: string;
}

const StockDisplay = ({ ticker, displayDate }: StockDisplayProps) => {
    return (
        <div className="financial-item-display">
            <h4>{ticker !== null ? ticker : 'N/A'}</h4>
            <p>{displayDate !== null ? displayDate : 'N/A'}</p>
        </div>
    );
};

export default StockDisplay;