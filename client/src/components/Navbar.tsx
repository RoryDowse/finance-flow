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
    <div className="nav">
      <div className="nav-title">
        <ul>
        {
          !loginCheck ? (
            <div>
              <h1>Welcome to Finance Flow</h1>
            </div>
          ) : (
            <div>
              <button type='button' onClick={() => {auth.logout();}}>Logout</button>
              <ul>
                <h2>
                  <Link to='/home'>Home</Link>
                </h2>
                <h2>
                  <Link to='/investment'>
                    <p>Investment</p>
                  </Link>
                </h2>
                <h2>
                  <Link to='/travel'>
                  <p>Currency Exchange</p>
                  </Link>
                </h2>
              </ul>
            </div>
          )
        }
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
