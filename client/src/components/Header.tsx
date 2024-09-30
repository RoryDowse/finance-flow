// Basic header that incorporates the websites background
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="webpage-background">
            <Link style={{ textDecoration: 'none' }} to="/home">                
                <h1>FinanceFlow</h1>
            </Link>
        </div>
      );
    };
    
export default Header;