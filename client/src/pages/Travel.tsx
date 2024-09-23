// src/components/Travel.tsx
import React, { useState, useEffect } from 'react';
import { Currency } from '../interfaces/CurrencyInterface';
import { CurrencyProjections } from '../interfaces/CurrencyProjections';
import './Travel.css';
import Footer from '../components/Footer';
import CurrencyDisplay from '../components/CurrencyDisplay';
import CurrencyExchangeCard from '../components/CurrencyExchangeCard';

const Travel: React.FC = () => {
    // Currency Types
    const [baseCurrency, setBaseCurrency] = useState<string>('USD');
    const [conversionCurrency, setConversionCurrency] = useState<string>('EUR');
    // Currency Exchange Variables
    const [amountToConvert, setAmountToConvert] = useState<number>(0);
    // Currency Projections Array
    const [currencyProjections, setCurrencyProjections] = useState<CurrencyProjections[]>([]);
   
    const exchangeKey = import.meta.env.VITE_EXCHANGE_API_KEY;

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

            const data: Currency = await response.json();
            const currencyRate: number = data.conversion_rates[conversionCurrency]
            const numberOfYearsArray = [1, 3, 5, 10].map(years => {
                if (currencyRate !== null) {
                    const calculatedValue = amountToConvert * years * currencyRate;
                    return {
                        years: years, 
                        currencyType: conversionCurrency, 
                        convertedAmount: calculatedValue 
                    };
                } else {
                    return {
                        years: years, 
                        currencyType: "USD", 
                        convertedAmount: "N/A"
                    }
                }
            });

            setCurrencyProjections(numberOfYearsArray);

        } catch (err) {
            console.log('an error occured when trying to fetch currency data', err);
        }
    };

    // Handles the Search bar Input, setting Currency to be whatever they type.
    const handleBaseCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBaseCurrency(event.target.value.toUpperCase());
    };

    const handleConversionCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConversionCurrency(event.target.value.toUpperCase());
    };

    const handleCashflowInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmountToConvert(parseInt(event.target.value));
    };

    // Handles submission for search field
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!baseCurrency || !conversionCurrency) {
            return;
        }
        await searchCurrencyType(baseCurrency, conversionCurrency);
    };

    useEffect(() => {
        setAmountToConvert(6045);
    }, []);

    return (
        <div>
            <div className="travel-page webpage-background">
                <i className="fas fa-chart-bar" style={{ color: '#F0544F' }}></i>
                <p className="description-1">Enter your Base Currency and  to get projections for the next 1, 3, 5, and 10 years based on cashflow</p>
                <i className="fas fa-calendar-alt" style={{ color: '#F0544F' }}></i>
                <p className="description-2">The projections are made on historical stock data from the past 10 years</p>
                <i className="fas fa-exclamation-triangle" style={{ color: '#F0544F' }}></i> 
                <p className="description-2">Past performance is not indicative of future outcomes</p>
                <h2 className="text-center">Currency Exchange Rates</h2>
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
                            <h3 className="exchange-search-text text-center">Converted Currency:</h3>
                            <input
                                type="text"
                                name="baseCurrency"
                                value={conversionCurrency}
                                onChange={handleConversionCurrencyInput}
                                placeholder="EUR"
                                className="exchange-input"
                            />
                            <h3 className="exchange-search-text text-center">Cashflow:</h3>
                            <input
                                type="text"
                                name="cashflow"
                                value={amountToConvert}
                                onChange={handleCashflowInput}
                                className="exchange-input"
                            />
                            <button className="search-button" type="submit">Search</button>
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
