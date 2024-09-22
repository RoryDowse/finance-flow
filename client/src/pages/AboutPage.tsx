import './AboutPage.css';
const About = () => {
    return (
        <div>
            <h2 className="text-center">About</h2>
            <div className="about-info">
                <p className="description">FinanceFlow helps users boost their cashflow, allowing them to:</p>

                <div className="icon-text">
                <i className="fas fa-dollar-sign"></i>
                <p>Prioritize income and expenses</p>
                </div>

                <div className="icon-text">
                <i className="fas fa-briefcase"></i>
                <p>Make informed investment decisions</p>
                </div>

                <div className="icon-text">
                <i className="fas fa-plane"></i>
                <p>Make better travel decisions by considering currency rates</p>
                </div>

                <h3>Features</h3>

                <div className="icon-text">
                <i className="fas fa-calculator"></i>
                <p>View cashflow</p>
                </div>

                <div className="icon-text">
                <i className="fas fa-chart-bar"></i>
                <p>Access stock data</p>
                </div>

                <div className="icon-text">
                <i className="fas fa-exchange-alt"></i>
                <p>Check currency exchange rates</p>
                </div>

                <h3>Projections</h3>

                <p className="description">The app calculates cashflow and projects potential returns using:</p>

                <div className="icon-text">
                <i className="fas fa-calendar-alt"></i>
                <p>10-year stock market data</p>
                </div>

                <div className="icon-text">
                <i className="fas fa-money-bill"></i>
                <p>Current currency exchange rates</p>
                </div>

                <p>
                <i className="fas fa-exclamation-triangle"></i> 
                <p className="description">Past performance is not indicative of future outcomes</p>
            </p>
            </div>
        </div>
    );
};

export default About;
