import { Link } from 'react-router-dom';
import './LandingPage.css';
import Logo from '../assets/images/financeflow-logo.png'

const LandingPage = () => {

    return (
        <div className="landing-page">
            <section className="logo-h1">
                <img src={Logo} alt="financeflow-logo" className="financeflow-logo"></img>
                <h1>Finance Flow</h1>
            </section>
            <div className="lp-both-containers">
                <section className="lp-left-container">
                    <h2>"Invest it, or travel with it"</h2>
                    <ul>
                        <li>Input income and expenses for a detailed cash flow analysis.</li>
                        <li>Explore the stock market to visualize data and make informed investment decisions.</li>
                        <li>Navigate an intuitive layout for easy financial management.</li>
                    </ul> 
                </section>
                <section className="lp-right-container">
                    <button className="login-button" type="button"><Link className="button-login" to='/login'>Login</Link></button>
                    <button className="create-account-button" type="button"><Link className="button-create-account" to='/create-account'>Create Account</Link></button>
                </section>
                
            </div>
        </div>
    );
}

export default LandingPage;