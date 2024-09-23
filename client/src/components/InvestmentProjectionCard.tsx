import './InvestmentProjectionCard.css';

interface InvestmentProjectionCardProps {
    years: number | null;
    averageReturn: number | null;
    totalReturn: number | null;
}

const InvestmentProjectionCard = ({ years, averageReturn, totalReturn }: InvestmentProjectionCardProps) => {
    // Format totalReturn with commas and two decimal places
    const formattedTotalReturn = totalReturn !== null
        ? `$${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : 'N/A';

    return (

            <div className="projection-card">
                <p className="projection-title">Year {years !== null ? years : 'N/A'}</p>
                <p className="projection-average-return">Average Annual Return:</p>
                <p>{averageReturn !== null ? averageReturn.toFixed(2) + '%' : 'N/A'}</p>
                <div className="return-display">
                <p className="projection-total-return">Total Return:</p> 
                <p>{formattedTotalReturn}</p>
                </div>
            </div>
    );
};

export default InvestmentProjectionCard;