import { useState, FormEvent, ChangeEvent } from 'react';
import { register } from '../api/authAPI';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

// import css file for styling
import './Form.css';

const CreateAccount = () => {

  // Stateful variable to hold the users username and password
  const [newUserData, setNewUserData] = useState({
      username: '',
      password: ''
    });
  
  // handles the change for when the user types in either username or password input field
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value
    });
  };

  // Creates the username & password through the register function and logs the user in
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
      try {
          const data = await register(newUserData);
          Auth.login(data.token)
      } catch (err) {
          console.error('Failed to Register', err);
      }
    };

  return (
      <div className="form-page">
        <button className='back-button'><Link className="button" to='/'>Back</Link></button>
        <div className="form-container">
          <form className="base-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <div className="form-group">
              <label>Username</label>
              <input
                type='text'
                name='username'
                value={newUserData.username || ''}
                onChange={handleChange}
              />
            </div> 
            <div className="form-group">
              <label>Password</label>
              <input
                type='password'
                name='password'
                value={newUserData.password || ''}
                onChange={handleChange}
              />
            </div>  
            <button className="login-button"type='submit'>Create Account</button>
          </form>
        </div>
      </div>
  );
}

export default CreateAccount;