import React, { useState, useEffect } from 'react';
import StockData from './interfaces/Stock.interface';
import { Projection } from './interfaces/Projection.interface';
import StockDisplay from '../components/StockDisplay';
import InvestmentProjectionCard from '../components/InvestmentProjectionCard';

// Get API Key and Base URL from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Investment = () => {
// State variables: ticker, loading status, stock data, projections, and error message
const [ticker, setTicker] = useState<string>('IBM'); // default ticker is IBM
const [isLoading, setIsLoading] = useState<boolean>(false);
const [stockData, setStockData] = useState<StockData | null>(null);
const [projections, setProjections] = useState<Projection[]>([]);
const [error, setError] = useState<string | null>(null);

// Fetch stock data from the API when the ticker changes
useEffect(() => {
    if (!ticker) return;

    async function fetchStockData() {
        setIsLoading(true); // Start loading
        setError(null); // Clear any previous error
        try {
            // Fetch stock data from API using ticker symbol and API key
            const response = await fetch(`${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${API_KEY}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: StockData = await response.json();

            // Check if the data is valid
            if (!data || !data['Time Series (Daily)']) {
                throw new Error('Invalid data received from the API');
            }

            // Store the fetched stock data in state
            setStockData(data);
        } catch (err) {
            // Set error message in case of a fetch failure
            setError(`Failed to fetch stock data: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false); // Stop loading
        }
    }

    // Call the fetch function
    fetchStockData();
}, [ticker]); // Only run when the ticker state changes

// Function to calculate investment projections based on stock data
const calculateProjections = () => {
    if (!stockData || !stockData["Time Series (Daily)"]) return;

    // Get relevant dates: today, yesterday, 10 years ago
    const today = new Date();
    const yesterday = new Date(); // fetch today's date or use yesterday's date if close not available
    yesterday.setDate(today.getDate() - 1);
    const tenYearsAgo = new Date(today);
    tenYearsAgo.setFullYear(today.getFullYear() - 10);

    // Extract the dates in 'YYYY-MM-DD' format
    const todayDate = today.toISOString().split('T')[0];
    const yesterdayDate = yesterday.toISOString().split('T')[0];
    const tenYearsAgoDate = tenYearsAgo.toISOString().split('T')[0];
    
    // Store closing prices for today, yesterday, and ten years ago
    const todayClose = parseFloat(stockData['Time Series (Daily)'][todayDate]?.['4. close'] || '0');
    const yesterdayClose = parseFloat(stockData['Time Series (Daily)'][yesterdayDate]?.['4. close'] || '0');
    const tenYearsAgoClose = parseFloat(stockData['Time Series (Daily)'][tenYearsAgoDate]?.['4. close'] || '0');

    // Use yesterday's close price if today's data is unavailable
    const closePrice = todayClose || yesterdayClose;

    // Return if close prices are invalid
    if (!closePrice || !tenYearsAgoClose) return;

    // Calculate the average annual return over the past ten years (Compound Annual Growth Rate)
    const averageAnnualReturn = (Math.pow(closePrice / tenYearsAgoClose, 1 / 10) -1) * 100;

     // Assume an initial investment amount (to be adjusted later)
    const initialInvestment = 10000; // Replace with cashflow figure

    // Calculate projections for the next 1, 3, 5, and 10 years
    const projectionsArray = [1, 3, 5, 10].map(years => {
        const futureValue = parseFloat((initialInvestment * Math.pow(1 + averageAnnualReturn / 100, years)).toFixed(2));
        return {
            years: years, // Number of years
            averageReturn: averageAnnualReturn, // Projected average annual return
            totalReturn: futureValue // Projected total value after the specified number of years
        };
    });
    // Store projections in the state
    setProjections(projectionsArray);
};

// Trigger the calculation of projections whenever stock data change
useEffect(() => {
    calculateProjections();
    console.log("stockData", stockData); // Log the stock data
    console.log("projections", projections); // Log the projections
}, [stockData]); // Run whenever stock data changes

// Update ticker state on input change
const handleTickerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(event.target.value);
};

 // Prevent form submission from reloading the page
const handleTickerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
};

// Display today's date on StockDisplay card
const displayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

 // Render the component UI
return (
  <section>
    {/* Form to input stock ticker */}
    <form onSubmit={handleTickerSubmit}>
        <input 
        type="text"
        value={ticker}
        onChange={handleTickerInputChange}
        placeholder="Enter ticker symbol"
        />
        {/* Uncomment button if manual submission is desired */}
        {/* <button type="submit">Search</button> */}
    </form>

    {/* handle loading and error states */}
    {isLoading && <p>Loading...</p>}
    {error && <p>{error}</p>}

     {/* Display investment projections if available */}
    {projections.length > 0 && (
        <div>
            <h2>Investment Projections</h2>
            <StockDisplay ticker={ticker} displayDate={displayDate} />
            {projections.map((projection) => (
                <InvestmentProjectionCard
                    key={projection.years}
                    years={projection.years}
                    averageReturn={projection.averageReturn}
                    totalReturn={projection.totalReturn}
                />
            ))}
        </div>
    )}
    </section>
);
};

export default Investment;