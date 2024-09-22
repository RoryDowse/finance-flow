import './CurrencyExchangeCard.css';

interface CurrencyExchangeCardProps {
    years: number | null;
    currencyType: string | null;
    convertedAmount: number | string | null;
}

const CurrencyExchangeCard = ({ years, currencyType, convertedAmount}: CurrencyExchangeCardProps) => {
    // Format totalReturn with commas and two decimal places
    const formattedConvertedAmount = convertedAmount !== null
        ? `$${convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : 'N/A';

    return (
        <div className="currency-exchange-card">
            <p className="currency-exchange-title">Year {years !== null ? years : 'N/A'}</p>
            <p className="currency-exchange-type">Currency Type:</p>
            <p>{currencyType}</p>
            <p className="currency-exchange-amount">Exchange Amount:</p> 
            <p>{formattedConvertedAmount}</p>
        </div>
    );
};

export default CurrencyExchangeCard;