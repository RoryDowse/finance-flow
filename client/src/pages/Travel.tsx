// src/components/Travel.tsx
import React, { useState, useEffect } from 'react';
import { Currency } from '../interfaces/CurrencyInterface';
import { CurrencyProjections } from '../interfaces/CurrencyProjections';
import './Travel.css';
import Footer from '../components/Footer';
import CurrencyDisplay from '../components/CurrencyDisplay';
import CurrencyExchangeCard from '../components/CurrencyExchangeCard';

const Travel: React.FC = () => {
    // Stateful Variables for Base Currency and the Target Currency
    const [baseCurrency, setBaseCurrency] = useState<string>('USD');
    const [conversionCurrency, setConversionCurrency] = useState<string>('EUR');
    // Stateful Variable for user cashflow
    const [amountToConvert, setAmountToConvert] = useState<number>(0);
    // Stateful Variable for the 1, 3, 5, and 10 year currency exchange projections
    const [currencyProjections, setCurrencyProjections] = useState<CurrencyProjections[]>([]);
    
    // Secret API Key
    const exchangeKey = import.meta.env.VITE_EXCHANGE_API_KEY;

    // Function that searches the Exchange-Rate API and uses that information in determining the base projections and yearly projections
    const searchCurrencyType = async (baseCurrency: string, conversionCurrency: string) => {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeKey}/latest/${baseCurrency}`, {
                headers: {
                    Authorization: `Bearer ${exchangeKey}`,
                  },
            })

            if (!response.ok) {
                throw new Error('invalid API response, make sure you are setting the correct currency types in each field');
            }

            // Data recieved from the API call
            const data: Currency = await response.json();

            // Gather the specific conversion rate for the target currency
            const currencyRate: number = data.conversion_rates[conversionCurrency]

            // Create a new array with the data provided for 1, 3, 5 and 10 year projections
            const numberOfYearsArray = [1, 3, 5, 10].map(years => {
                if (currencyRate !== null) {
                    const calculatedValue = amountToConvert * years * currencyRate;
                    return {
                        years: years, 
                        currencyType: conversionCurrency, 
                        convertedAmount: calculatedValue.toFixed(0)
                    };
                } else {
                    return {
                        years: years, 
                        currencyType: "USD", 
                        convertedAmount: "N/A"
                    }
                }
            });

            // Sets the projections based on the array information for 1, 3, 5 and 10 year projections
            setCurrencyProjections(numberOfYearsArray);
        } catch (err) {
            console.log('an error occured when trying to fetch currency data', err);
        }
    };

    // Handles the Input, setting Currency to be what is typed in the first input.
    const handleBaseCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBaseCurrency(event.target.value.toUpperCase());
    };

    // Handles the Input, setting the target currency (conversionCurrency) to what is typed in the second input
    const handleConversionCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConversionCurrency(event.target.value.toUpperCase());
    };

    // Handles submission for search field
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!baseCurrency || !conversionCurrency) {
            return;
        }
        await searchCurrencyType(baseCurrency, conversionCurrency);
    };

    // On load, gathers the users cashflow from the main page and sets it as the "amountToConvert"
    useEffect(() => {
        setAmountToConvert(parseInt(localStorage.getItem('cashflow') ?? '0'));
    }, []);

    return (
        <div>
            <div className="travel-page webpage-background">
                <h2 className="text-center">Currency Exchange Rates</h2>
                <i className="fas fa-chart-bar" style={{ color: '#F0544F' }}></i>
                <p className="description-1">Enter your Base Currency and Target Currency to see Cashflow</p>
                <i className="fas fa-calendar-alt travel-i"></i>
                <p className="description-2">The results are based on up-to-date currency exchange rates</p>
                <i className="fas fa-exclamation-triangle" style={{ color: '#F0544F' }}></i> 
                <p className="description-2">You will recieve 1, 3, 5 and 10 year projections of the target currency based on your cashflow</p>
                <div className="content">
                    <aside className="sidebar">
                        <form className="search-center" onSubmit={handleSubmit}>
                            <h3 className="exchange-search-text text-center">Base Currency:</h3>
                            <input
                                type="text"
                                name="baseCurrency"
                                value={baseCurrency}
                                onChange={handleBaseCurrencyInput}
                                placeholder="USD"
                                className="exchange-input"
                            />
                            <h3 className="exchange-search-text text-center">Target Currency:</h3>
                            <input
                                type="text"
                                name="baseCurrency"
                                value={conversionCurrency}
                                onChange={handleConversionCurrencyInput}
                                placeholder="EUR"
                                className="exchange-input"
                            />
                            <button className="submit-button" type="submit">Search</button>
                        </form>
                    </aside>
                    <section className="main-content">
                        <div>
                            <CurrencyDisplay 
                            baseCurrencyType={baseCurrency}
                            currentCashflow={amountToConvert}
                            />
                            <div className="projection-container">
                                {currencyProjections.map((currencyProjection) => (
                                    <CurrencyExchangeCard
                                    key={currencyProjection.years}
                                    years={currencyProjection.years}
                                    currencyType={currencyProjection.currencyType}
                                    convertedAmount={currencyProjection.convertedAmount}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default Travel;
