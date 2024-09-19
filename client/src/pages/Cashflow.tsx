// src/components/Cashflow.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import IncomeForm from '../components/IncomeForm';
// import ExpensesForm from '../components/ExpensesForm';

// set state variables: income, expenses, and cashflow
const Cashflow: React.FC = () => {
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [cashflow, setCashflow] = useState<number>(0);

    // trigger function to fetch income and expenses
useEffect(() => {
    fetchTotalIncome();
    fetchTotalExpenses();
}, []);

// fetch income from the database - set the state variable - handle errors
const fetchTotalIncome = async () => {
    try {
        const response = await axios.get('/api/income/total'); // create file 
        setTotalIncome(response.data.totalIncome);
    } catch (error) {
        console.error('Error fetching total income:', error);
    }
};

// fetch expenses from the database - set the state variable - handle errors
const fetchTotalExpenses = async () => {
    try {
        const response = await axios.get('/api/expenses/total'); // Adjust this URL if necessary
        setTotalExpenses(response.data.totalExpenses);
    } catch (error) {
        console.error('Error fetching total expenses:', error);
    }
};
// trigger function to calculate cashflow - set the state variable
useEffect(() => {
    const calculatedCashflow = totalIncome - totalExpenses;
    setCashflow(calculatedCashflow);
}, [totalIncome, totalExpenses]);

return (
    <div>
        <h1>Cashflow</h1>
        <h2>Total Income: ${totalIncome.toFixed(2)}</h2>
        <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
        <h2>Cashflow: ${cashflow.toFixed(2)}</h2>
        </div>
    );
};

export default Cashflow;
