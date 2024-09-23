import './AboutPage.css';

interface CardProps {
    children: React.ReactNode;
  }
  
  const Card = ({ children }: CardProps) => {
    return (
      <div className="card">
        {children}
      </div>
    );
  };

const About = () => {
    return (
        <div>
            <h2 className="text-center">About</h2>
            <div className="about-info">
                <Card>
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
                </Card>

                <h3>Features</h3>
                <Card>
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
                </Card>

                <h3>Projections</h3>
                <Card>
                    <p className="description">The app calculates cashflow and projects potential returns using:</p>
                    <div className="icon-text">
                        <i className="fas fa-calendar-alt"></i>
                        <p>10-year stock market data</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-money-bill"></i>
                        <p>Current currency exchange rates</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p className="description">Past performance is not indicative of future outcomes</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default About;
