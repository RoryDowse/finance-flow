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
        <div className="investment-projection-card">
            <p>Year: {years !== null ? years : 'N/A'}</p>
            <p>Average Annual Return: {averageReturn !== null ? averageReturn.toFixed(2) + '%' : 'N/A'}</p>
            <p>Total Return: {formattedTotalReturn}</p>
        </div>
    );
};

export default InvestmentProjectionCard;