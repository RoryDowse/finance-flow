
import { Link } from 'react-router-dom';

const LandingPage = () => {

    return (
        <div className="landing-page">
            <section>
                <h1>Finance Flow</h1>
            </section>
            <div className="lp-both-containers">
                <section className="lp-left-container">
                    <button type="button"><Link to='/login'>Login</Link></button>
                    <button type="button"><Link to='/create-account'>Create Account</Link></button>
                </section>
                <section className="lp-right-container">
                    <h2>About Finance Flow</h2>
                    <p>This is a description of the website</p>
                </section>
            </div>
        </div>
    );
}

export default LandingPage;