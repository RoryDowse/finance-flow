import Footer from '../components/Footer';
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
        <div className="webpage-background">
            <h2 className="text-center about-h2">About</h2>
            <div className="about-info">
                <Card>
                    <p className="description-head">FinanceFlow helps users boost their cashflow:</p>
                    <div className="icon-text">
                        <i className="fas fa-dollar-sign"></i>
                        <p className="description">Prioritize income and expenses</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-briefcase"></i>
                        <p className="description">Make informed investment decisions</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-plane"></i>
                        <p className="description">Make better travel decisions by considering currency rates</p>
                    </div>
                </Card>

                <h3 className="about-h3">Features</h3>
                <Card>
                <p className="description-head">Users can:</p>
                    <div className="icon-text">
                        <i className="fas fa-calculator"></i>
                        <p className="description">View cashflow</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-chart-bar"></i>
                        <p className="description">Access stock data</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-exchange-alt"></i>
                        <p className="description">Check currency exchange rates</p>
                    </div>
                </Card>

                <h3 className="about-h3">Projections</h3>
                <Card>
                    <p className="description-head">The app calculates cashflow and projects potential returns using:</p>
                    <div className="icon-text">
                        <i className="fas fa-calendar-alt"></i>
                        <p className="description">10-year stock market data</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-money-bill"></i>
                        <p className="description">Current currency exchange rates</p>
                    </div>
                    <div className="icon-text">
                        <i className="fas fa-exclamation-triangle"></i>
                        <p className="description">Past performance is not indicative of future outcomes</p>
                    </div>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default About;
