import React, { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import { Link } from "react-router-dom";

// Import css file for styling
import './Form.css';

const Login: React.FC = () => {

  // Stateful variable to hold the users Login information
  const [loginData, setLoginData] = useState({
      username: '',
      password: ''
    });

  // Stateful variable to display an error message when login credentials are incorrect
  const [errorMessage, setErrorMessage] = useState('');
  
  // Handles the change for when the user types in either the username or password fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  // Checks if the user can be logged in based on information stored within the database
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage('Invalid username or password. Please try again.');
    }
  };
    
  return (
    <div className="form-page">
      <button className='back-button'><Link className="button" to='/'>Back</Link></button>
        <div className="form-container">
            <form className="base-form" onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="form-group">
                <label>Username</label>
                <input
                type='text'
                name='username'
                value={loginData.username || ''}
                onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                type='password'
                name='password'
                value={loginData.password || ''}
                onChange={handleChange}
                />
              </div>
              <button className="login-button" type='submit'>Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    </div>
  );
};

export default Login;
