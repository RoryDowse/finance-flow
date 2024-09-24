import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveTotalIncome } from '../api/incomeAPI';
import { retrieveTotalExpenses } from '../api/expensesAPI';
import './Cashflow.css';
// import ErrorPage from './ErrorPage';


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

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

  // trigger function to calculate cashflow - set the state variable
  useEffect(() => {
      const calculatedCashflow = totalIncome - totalExpenses;
      setCashflow(calculatedCashflow);
      localStorage.setItem('cashflow', String (calculatedCashflow));
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
        </div>
      ) : (
        <div>
          <h2 className="text-center">Cashflow</h2>
          <div className="icon-text">
            <i className="fas fa-calculator"></i>
            <p className="element-1">Cashflow is the difference between the total income and the total expenses</p> 
          </div>
          <div className="icon-text">
            <i className="fas fa-dollar-sign"></i>
            <p className="element-2">Prioritize income and prioritize expenses to boost cashflow</p>
          </div>
          <div className="icon-text">
            <i className="fas fa-briefcase"></i>
            <p className="element-3">Use cashflow to make investment and travel decisions</p>
          </div>
          <div className="cashflow-container">
            <p className="total-income-title">Total Income:</p>
            <p className="total-income">{formatCurrency(totalIncome)}</p>
            <p className="total-expenses-title">Total Expenses:</p> 
            <p className="total-expenses">{formatCurrency(totalExpenses)}</p>
            <div className="cashflow-display">
              <p className="cashflow-title">Cashflow:</p>
              <p className="cashflow">{formatCurrency(cashflow)}</p>
            </div>
        </div>
      </div>
        )
    }
    </>
  );
}

export default Cashflow;