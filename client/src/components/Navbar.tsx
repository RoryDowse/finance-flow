import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
      navigate('/home');
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <div>
      {
        !loginCheck ? (
          <div>
            <h1></h1>
          </div>
        ) : (
          <div className="navbar-container">
            <div>
              <img src="" alt="financeflow-logo"></img>
            </div>
            <div className="navbar-inner-container">
              <p>
                <Link className="navbar-links" to='/home'>Home</Link>
              </p>
              <p>
                <Link className="navbar-links" to='/expenses'>
                  (Expenses)
                </Link>
              </p>
              <p>
                <Link className="navbar-links" to='/investment'>
                  Investment
                </Link>
              </p>
              <p>
                <Link className="navbar-links" to='/travel'>
                  Currency Exchange
                </Link>
              </p>
              <p>
                <Link className="navbar-links" to='/about'>
                  About
                </Link>
              </p>
            </div>
            <button
              className="navbar-logout-button"
              type='button'
              onClick={() => { auth.logout(); }}>
              Logout
            </button>
          </div>
        )
      }
    </div>
  );
};

export default Navbar;
