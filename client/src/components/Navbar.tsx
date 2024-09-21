import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import auth from '../utils/auth';


const Navbar = () => {

  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck])

  return (
    <div>
      {
        !loginCheck ? (
          <div>
            <h1>Welcome to Finance Flow</h1> 
          </div>
        ) : (
          <div className="navbar-container">
            <div>
              <img src="" alt="financeflow-logo"></img>
            </div>
            <div className="navbar-inner-container">
              <h2>
                <Link className="navbar-links" to='/home'>Home</Link>
              </h2>
              <h2>
                <Link className="navbar-links" to='/expenses'>
                  <p>(Expenses)</p>
                </Link>
              </h2>
              <h2>
                <Link className="navbar-links" to='/investment'>
                  <p>Investment</p>
                </Link>
              </h2>
              <h2>
                <Link className="navbar-links" to='/travel'>
                  <p>Currency Exchange</p>
                </Link>
              </h2>
              <h2>
                <Link className="navbar-links" to='/about'>
                  <p>About</p>
                </Link>
              </h2>
            </div>
            
            <button className="navbar-logout-button"type='button' onClick={() => {auth.logout();}}>Logout</button>
          </div>
        )
      }
    </div>
  );
};

export default Navbar;
