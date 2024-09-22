import { useState, FormEvent, ChangeEvent } from 'react';
import { register } from '../api/authAPI_temp';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
 
    const [newUserData, setNewUserData] = useState({
        username: '',
        password: ''
      });
   
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUserData({
          ...newUserData, // Unsure what to do with this data? Is this viable? 1st thought: No. Due to authentication.
          [name]: value
        });
      };

      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
            // Create a POST request for a new user with the login credentials provided
            try {
                const data = await register(newUserData);
                Auth.login(data.token)

            } catch (err) {
                console.error('Failed to Register', err);
            }
        };

    return (
        <div className="login-page">
          <button className='back-button'><Link className="back-button-link" to='/'>Back</Link></button>
          <div className="form-container">
            <form className="base-form" onSubmit={handleSubmit}>
              <h2>Create Account</h2>
              <div className="form-group">
                <label>Enter Username</label>
                <input
                  type='text'
                  name='username'
                  value={newUserData.username || ''}
                  onChange={handleChange}
                />
              </div> 
              <div className="form-group">
                <label>Enter Password</label>
                <input
                  type='password'
                  name='password'
                  value={newUserData.password || ''}
                  onChange={handleChange}
                />
              </div>  
              <button className="submit-button"type='submit'>Submit Form</button>
            </form>
          </div>
        </div>
    );
}

export default CreateAccount;