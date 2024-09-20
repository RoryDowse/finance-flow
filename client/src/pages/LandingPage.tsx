
import { Link } from 'react-router-dom';

const LandingPage = () => {

    return (
        <div className="landing-page-setup">
            <button type="button"><Link to='/login'>Login</Link></button>
            <button type="button"><Link to='/create-account'>Create Account</Link></button>
        </div>
    );
}

export default LandingPage;