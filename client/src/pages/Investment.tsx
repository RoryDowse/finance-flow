
import React, { useState, useEffect } from 'react';
import StockData from './interfaces/Stock.interface';
import { Projection } from './interfaces/Projection.interface';


// import API key and base URL
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Investment = () => {
// add state variables: stockData, projections, isLoading, and error
const [stockData, setStockData] = useState<StockData | null>(null);
const [projections, setProjections] = useState<Projection[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const [ticker, setTicker] = useState<string>('IBM'); // default ticker is IBM


// useEffect to fetch data from API
useEffect(() => {
    if (!ticker) return;

    const fetchStockData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${API_KEY}`);
            // const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: StockData = await response.json();

            if (!data || !data['Time Series (Daily)']) {
                throw new Error('Invalid data received from the API')
            }

            // store the response data in state
            setStockData(data);
        } catch (err) {
            // handle errors
            setError(`Failed to fetch stock data: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    fetchStockData();
}, [ticker]); // run only when ticker changes

// create a function to calculate the projections
const calculateProjections = () => {
    if (!stockData || !stockData["Time Series (Daily)"]) return;

    // store yesterday's date in ISO format
    const today = new Date();
    const yesterday = new Date(); // fetch today's date or use yesterday's date if close not available
    yesterday.setDate(today.getDate() - 1);
    // store 10-year date in ISO format
    const tenYearsAgo = new Date(today);
    tenYearsAgo.setFullYear(today.getFullYear() - 10);

    const todayDate = today.toISOString().split('T')[0];
    const yesterdayDate = yesterday.toISOString().split('T')[0];
    const tenYearsAgoDate = tenYearsAgo.toISOString().split('T')[0];
    
    const todayClose = parseFloat(stockData['Time Series (Daily)'][todayDate]?.['4. close'] || '0');
    // store yesterdays's close price
    const yesterdayClose = parseFloat(stockData['Time Series (Daily)'][yesterdayDate]?.['4. close'] || '0');
    // store 10-year's close price
    const tenYearsAgoClose = parseFloat(stockData['Time Series (Daily)'][tenYearsAgoDate]?.['4. close'] || '0');

    // create backup if close not available
    const closePrice = todayClose || yesterdayClose;

    if (!closePrice || !tenYearsAgoClose) return;

    // calculate average annual return
    const averageAnnualReturn = (Math.pow(closePrice / tenYearsAgoClose, 1 / 10) -1) * 100; // CAGR calculation

    // setup projections array with projection object for 1, 3, 5, 10 years
    const initialInvestment = 10000; // replace with cashflow figure
    // calculate projection array objects to pass to the investment projection cards (or calculate on rendering the cards)
    const projectionsArray = [1, 3, 5, 10].map(years => {
        const futureValue = parseFloat((initialInvestment * Math.pow(1 + averageAnnualReturn / 100, years)).toFixed(2));
        return {
            years: years, // 'years' is the current item from the array [1, 3, 5, 10]
            averageReturn: averageAnnualReturn,
            totalReturn: futureValue
        };
    });
    // store projections in state
    setProjections(projectionsArray);
};

// Call function to fetch stock data
useEffect(() => {
    calculateProjections();
    console.log("stockData", stockData);
    console.log("projections", projections);
}, [stockData]);

// Input change handler
const handleTickerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
};

// Input change handler
const handleTickerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
};

// render (ticker search form); investment title card; map the investment projection cards
return (
  <section>
    <form onSubmit={handleTickerSubmit}>
        <input 
        type="text"
        value={ticker}
        onChange={handleTickerInputChange}
        placeholder="Enter ticker symbol"
        />
        {/* <button type="submit">Search</button> */}
    </form>

    {/* handle loading and error states */}
    {isLoading && <p>Loading...</p>}
    {error && <p>{error}</p>}

    {projections.length > 0 && (
        <div>
            <h2>Investment Projections</h2>
            {projections.map((projection) => (
                <div key={projection.years}>
                    <h3>{projection.years} Year Projection</h3>
                    <p>Average Return: {projection.averageReturn?.toFixed(2)}%</p>
                    <p>Total Value: ${projection.totalReturn?.toFixed(2)}</p>
                </div>
            ))}
        </div>
    )}
    </section>
);
};

export default Investment;
// note: console.log at each step to check data for debugging