import React, { useState, useEffect } from 'react';
import StockData from '../interfaces/StockInterface.tsx';
import { Projection } from '../interfaces/ProjectionInterface';
import StockDisplay from '../components/StockDisplay';
import InvestmentProjectionCard from '../components/InvestmentProjectionCard';
import './Investment.css';

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

const [recentClosePrice, setRecentClosePrice] = useState<number | null>(null);
const [recentTenYearsAgoClose, setRecentTenYearsAgoClose] = useState<number | null>(null);


// Fetch stock data from the API
const fetchStockData = async function () {
  if (!ticker) return;

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
};

// Function to calculate investment projections based on stock data
const calculateProjections = () => {
  if (!stockData || !stockData["Time Series (Daily)"]) return;

  // Get relevant dates
  const today = new Date();
  const yesterday = new Date(); // fetch today's date or use yesterday's date if close not available
  yesterday.setDate(today.getDate() - 1);
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);
  const fourDaysAgo = new Date();
  fourDaysAgo.setDate(today.getDate() - 4);
  
  const tenYearsAgo = new Date(today);
  tenYearsAgo.setFullYear(today.getFullYear() - 10);
  const yesterdayTenYearsAgo = new Date(tenYearsAgo);
  yesterdayTenYearsAgo.setDate(tenYearsAgo.getDate() - 1);
  const twoDaysAgoTenYearsAgo = new Date(tenYearsAgo);
  twoDaysAgoTenYearsAgo.setDate(tenYearsAgo.getDate() - 2);
  const threeDaysAgoTenYearsAgo = new Date(tenYearsAgo);
  threeDaysAgoTenYearsAgo.setDate(tenYearsAgo.getDate() - 3);
  const fourDaysAgoTenYearsAgo = new Date(tenYearsAgo);
  fourDaysAgoTenYearsAgo.setDate(tenYearsAgo.getDate() - 4);

  // Extract the dates in 'YYYY-MM-DD' format
  const todayDate = today.toISOString().split('T')[0];
  const yesterdayDate = yesterday.toISOString().split('T')[0];
  const twoDaysAgoDate = twoDaysAgo.toISOString().split('T')[0];
  const threeDaysAgoDate = threeDaysAgo.toISOString().split('T')[0];
  const fourDaysAgoDate = fourDaysAgo.toISOString().split('T')[0];

  const tenYearsAgoDate = tenYearsAgo.toISOString().split('T')[0];
  const yesterdayTenYearsAgoDate = yesterdayTenYearsAgo.toISOString().split('T')[0];
  const twoDaysAgoTenYearsAgoDate = twoDaysAgoTenYearsAgo.toISOString().split('T')[0];
  const threeDaysAgoTenYearsAgoDate = threeDaysAgoTenYearsAgo.toISOString().split('T')[0];
  const fourDaysAgoTenYearsAgoDate = fourDaysAgoTenYearsAgo.toISOString().split('T')[0];

  
  // Store closing prices
  const todayClose = parseFloat(stockData['Time Series (Daily)'][todayDate]?.['4. close'] || '0');
  const yesterdayClose = parseFloat(stockData['Time Series (Daily)'][yesterdayDate]?.['4. close'] || '0');
  const twoDaysAgoClose = parseFloat(stockData['Time Series (Daily)'][twoDaysAgoDate]?.['4. close'] || '0');
  const threeDaysAgoClose = parseFloat(stockData['Time Series (Daily)'][threeDaysAgoDate]?.['4. close'] || '0');
  const fourDaysAgoClose = parseFloat(stockData['Time Series (Daily)'][fourDaysAgoDate]?.['4. close'] || '0');
  
  const tenYearsAgoClose = parseFloat(stockData['Time Series (Daily)'][tenYearsAgoDate]?.['4. close'] || '0');
  const yesterdayTenYearsAgoClose = parseFloat(stockData['Time Series (Daily)'][yesterdayTenYearsAgoDate]?.['4. close'] || '0');
  const twoDaysAgoTenYearsAgoClose = parseFloat(stockData['Time Series (Daily)'][twoDaysAgoTenYearsAgoDate]?.['4. close'] || '0');
  const threeDaysAgoTenYearsAgoClose = parseFloat(stockData['Time Series (Daily)'][threeDaysAgoTenYearsAgoDate]?.['4. close'] || '0');
  const fourDaysAgoTenYearsAgoClose = parseFloat(stockData['Time Series (Daily)'][fourDaysAgoTenYearsAgoDate]?.['4. close'] || '0');

  // Use backup close prices if today's data is unavailable
  const recentClosePrice = todayClose || yesterdayClose || twoDaysAgoClose || threeDaysAgoClose || fourDaysAgoClose;
  const recentTenYearsAgoClose = tenYearsAgoClose || yesterdayTenYearsAgoClose || twoDaysAgoTenYearsAgoClose || threeDaysAgoTenYearsAgoClose || fourDaysAgoTenYearsAgoClose;

  // Return if today's close prices are invalid
  if (!recentClosePrice || !recentTenYearsAgoClose) {
      console.log('Invalid close prices', recentClosePrice, recentTenYearsAgoClose);
      return;
    }

      setRecentClosePrice(recentClosePrice);
      setRecentTenYearsAgoClose(recentTenYearsAgoClose);
  

  // Calculate the average annual return over the past ten years (Compound Annual Growth Rate)
  const averageAnnualReturn = (Math.pow(recentClosePrice / recentTenYearsAgoClose, 1 / 10) -1) * 100;

    // Assume an initial investment amount (to be adjusted later)
  const initialInvestment = 6045; // Replace with cashflow figure

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

 // Run the fetchStockData function when the form is submitted
const handleTickerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchStockData();
};

 // Render the component UI
 return (
    <div className="investment-page">
      <h2 className="text-center">Investment</h2>
      <div className="content">
        <aside className="sidebar">
          <h3 className="ticker-search-text text-center">Ticker Search:</h3>
          <form onSubmit={handleTickerSubmit}>
            <input 
              type="text"
              value={ticker}
              onChange={handleTickerInputChange}
              className="ticker-input"
            />
            <button className="submit-button" type="submit">Search</button>
          </form>
        </aside>
  
        <section className="main-content">
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
  
          {projections.length > 0 && (
            <div>
              <StockDisplay 
              ticker={ticker} 
              recentClosePrice={recentClosePrice}
              recentTenYearsAgoClose={recentTenYearsAgoClose}
              />
              <div className="projection-container">
                {projections.map((projection) => (
                  <InvestmentProjectionCard
                    key={projection.years}
                    years={projection.years}
                    averageReturn={projection.averageReturn}
                    totalReturn={projection.totalReturn}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );  
};

export default Investment;