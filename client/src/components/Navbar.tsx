import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import auth from '../utils/auth';
import './Navbar.css';
import Logo from '../assets/images/financeflow-logo.png'


const Navbar = () => {

  const [ loginCheck, setLoginCheck ] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
      navigate('/home');
    }
  };

  useEffect(() => {
    checkLogin();
  }, [loginCheck])

  return (
    <div>
      {
        !loginCheck ? (
          <div></div>
        ) : (
          <div>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-background">
              <div className="container-fluid d-flex justify-content-between">
                <Link className="navbar-brand" to="/home">
                  <img src={Logo} alt="financeflow-logo" className="navbar-logo navbar-financeflow-logo"></img>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"  data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                  <li className="nav-item text-center">
                      <Link className="nav-link navbar-color" to='/home'>
                        Home
                      </Link>
                    </li>
                    {
                    /* <li className="nav-item">
                      <Link className="nav-link" to='/expenses'>
                        Expenses
                      </Link>
                    </li> */ 
                    
                    /* Uncomment when expenses page is ready */}
                    <li className="nav-item text-center">
                      <Link className="nav-link navbar-color" to='/investment'>
                        Investment
                      </Link>
                    </li>
                    <li className="nav-item text-center">
                      <Link className="nav-link navbar-color" to='/travel'>
                        Currency Exchange
                      </Link>
                    </li>
                    <li className="nav-item text-center">
                      <Link className="nav-link navbar-color" to='/about'>
                        About
                      </Link>
                    </li>
                  </ul>
                  <button className="btn btn-outline-danger ms-auto navbar-color" type="button" onClick={() => {auth.logout();}}>Logout</button>
                </div>
              </div>
            </nav>
          </div>
        )
      }
    </div>
  );
};

export default Navbar;
