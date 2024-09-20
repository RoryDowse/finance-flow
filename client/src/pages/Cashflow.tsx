import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveTotalIncome } from '../api/incomeAPI';
import { retrieveTotalExpenses } from '../api/expensesAPI';


const Cashflow = () => {
  const [error, setError] = useState(false); 
  const [loginCheck, setLoginCheck] = useState(false);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [cashflow, setCashflow] = useState<number>(0);
  
  useEffect(() => {
      fetchTotalIncome();
      fetchTotalExpenses();
  }, []);
  
  // trigger function to fetch income and expenses
  // fetch income from the database - set the state variable - handle errors
  const fetchTotalIncome = async () => {
      try {
          const data = await retrieveTotalIncome(); 

          setTotalIncome(data.totalIncome);
          console.log('Total Income:', data);
      } catch (err) {
          console.error('Error fetching total income:', err);
          setError(true);
      }
  };

  // fetch expenses from the database - set the state variable - handle errors
  const fetchTotalExpenses = async () => {
      try {
          const data = await retrieveTotalExpenses(); 
          setTotalExpenses(data.totalExpenses);
          console.log('Total Expenses:', data);
      } catch (err) {
          console.error('Error fetching total expenses:', err);
          setError(true);
      }
  };

  // trigger function to calculate cashflow - set the state variable
  useEffect(() => {
      const calculatedCashflow = totalIncome - totalExpenses;
      setCashflow(calculatedCashflow);
  }, [totalIncome, totalExpenses]);
  
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
        <div>
          <div>
            <h1>Cashflow</h1>
            <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
            <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
            <h2>Cashflow: ${cashflow.toFixed(2)}</h2>
          </div>
        </div>
        )
    }
    </>
  );
}
export default Cashflow;