import { useState, useLayoutEffect } from 'react';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';


const Cashflow = () => {
  const [error, setError] = useState(false); // What would the Error be on this page?
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
    {
      !loginCheck ? (
        <div>
          <h1>
            Finance Flow
          </h1>
          <img></img>
        </div>
      ) : (
          <div >
            <h1>Cash Flow</h1>
            <p>Welcome to the Main Page!</p>
          </div>
        )
    }
    </>
  );
};

export default Cashflow;