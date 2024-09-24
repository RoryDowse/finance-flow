import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveTotalIncome } from '../api/incomeAPI';
import { retrieveTotalExpenses } from '../api/expensesAPI';
import './Cashflow.css';
import Footer from '../components/Footer';

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
  
  // Fetch income and expenses, set the state variable, handle errors
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

  // Fetch expenses from the database, set the state variable, handle errors
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

  // Calculate cashflow, set the state variable
  useEffect(() => {
      const calculatedCashflow = totalIncome - totalExpenses;
      setCashflow(calculatedCashflow);
      localStorage.setItem('cashflow', String (calculatedCashflow));
  }, [totalIncome, totalExpenses]);
  
  // Check if user is logged in
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
        <div className="webpage-background cashflow-page">
          <h2 className="text-center">Cashflow</h2>
          <div className="icon-text">
            <i className="fas fa-calculator cashflow-i cashflow-i-first"></i>
            <p className="element-1">Cashflow is the difference between the total income and the total expenses</p> 
          </div>
          <div className="icon-text">
            <i className="fas fa-dollar-sign cashflow-i"></i>
            <p className="element-2">Prioritize income and prioritize expenses to boost cashflow</p>
          </div>
          <div className="icon-text">
            <i className="fas fa-briefcase cashflow-i"></i>
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
        <Footer />
      </div>
        )
    }
    </>
  );
}

export default Cashflow;