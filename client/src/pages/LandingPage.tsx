import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {

    return (
        <div className="landing-page">
            <section>
                <h1>Finance Flow</h1>
            </section>
            <div className="lp-both-containers">
                <section className="lp-left-container">
                    <h2>About Finance Flow</h2>
                    <p>This is a description of the website</p>
                </section>
                <section className="lp-right-container">
                    <button className="login-button" type="button"><Link className="button" to='/login'>Login</Link></button>
                    <button className="create-account-button" type="button"><Link className="button" to='/create-account'>Create Account</Link></button>
                </section>
                
            </div>
        </div>
    );
}

export default LandingPage;