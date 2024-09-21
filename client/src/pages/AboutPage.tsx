import './AboutPage.css';
const About = () => {
    return (
        <div>
            <h2 className="text-center">About</h2>
            <p className="about-info">FinanceFlow helps users better understand their cashflow, allowing them to prioritize expenses, boost cashflow, and make informed investment and travel decisions. The app provides users with the ability to view cashflow, access stock data, and check currency exchange rates. It calculates cashflow based on total income and expenses and projects potential returns using 10-year stock market data alongside current currency rates. The stock market data is derived from comparing today's close price with the close price from ten years ago to assess past performance. In cases where the exact close date is unavailable, the closest available date is used. Note that past performance is not indicative of future outcomes, and this app is intended for educational purposes only.</p>
        </div>
    );
};

export default About;
