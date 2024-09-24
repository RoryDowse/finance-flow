import './CurrencyExchangeCard.css';

interface CurrencyExchangeCardProps {
    years: number | null;
    currencyType: string | null;
    convertedAmount: number | string | null;
}

const CurrencyExchangeCard = ({ years, currencyType, convertedAmount}: CurrencyExchangeCardProps) => {
    // Format the cashflow converted to whatever the target currency is
    const formattedConvertedAmount = convertedAmount !== null
        ? convertedAmount.toLocaleString('en-US')
        : 'N/A';

    return (
        <div className="currency-exchange-card">
            <p className="currency-exchange-title">Year {years !== null ? years : 'N/A'}</p>
            <p className="currency-exchange-type">Currency Type:</p>
            <p>{currencyType}</p>
            <div className="return-display">
                <p className="currency-exchange-amount">Exchange Amount:</p> 
                <p>{formattedConvertedAmount}</p>
            </div>
        </div>
    );
};

export default CurrencyExchangeCard;