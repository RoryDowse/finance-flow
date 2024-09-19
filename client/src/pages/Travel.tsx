// src/components/Travel.tsx
import React, { useState } from 'react';
import { Currency } from './interfaces/Currency.Interface.tsx';

const Travel: React.FC = () => {

    const defaultCashflow = 10000;
   
    const [conversionCurrency, setConversionCurrency] = useState<string>('');
    const [baseCurrency, setBaseCurrency] = useState<string>('');
    const [convertedAmount, setConvertedAmount] = useState<number | undefined>(undefined);
    const [conversionRate, setConversionRate] = useState<number | null> (null);
    const [numberOfYears, setNumberOfYears] = useState<number>(1);
    const [amountToConvert, setAmountToConvert] = useState<number>(defaultCashflow);
    const [error, setError] = useState<string | null>();
   
    const exchangeKey = import.meta.env.VITE_EXCHANGE_API_KEY;


    const searchCurrencyType = async (baseCurrency: string) => {
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


            setConversionRate(currencyRate);
             // This number will be the "Cashflow" from the expenses page
            const converted = currencyRate * amountToConvert;

            setConvertedAmount(converted);

        } catch (err) {
            console.log('an error occured when trying to fetch currency data', err);
            setConvertedAmount(undefined);
            setError('Failed to fetch currency data. Please check your input');
        }
    };

    // This function will take the number of years the user chooses and convert the numbers displayed for convertedAmount
    const currencyPerYear = (years: number) => {
        if (conversionRate !== null) {
            const newAmount = amountToConvert * years * conversionRate;
            setNumberOfYears(years);
            setConvertedAmount(newAmount);
        } else {
            setConvertedAmount(undefined);
        }
    }

    // Handles the Search bar Input, setting Currency to be whatever they type.
    const handleBaseCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBaseCurrency(event.target.value.toUpperCase());
    };

    const handleConversionCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConversionCurrency(event.target.value.toUpperCase());
    };

    // Handles submission for search field
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!baseCurrency || !conversionCurrency) {
            setError('Please provide both currencies.');
            return;
        } else if (baseCurrency && conversionCurrency) {
            setError(null);
        }
        searchCurrencyType(baseCurrency);
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>What is your Base Currency?</label>
                <input
                type="text"
                value={baseCurrency}
                onChange={handleBaseCurrencyInput}
                placeholder="USD"
                />
                <label>What Currency would you like to convert to?</label>
                <input
                type="text"
                value={conversionCurrency}
                onChange={handleConversionCurrencyInput}
                placeholder="EUR"
                />
                <button type="submit">Search</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                <h2>Currency Exchange Rates</h2>
                <p>
                    Your Cashflow of {amountToConvert} Converted from {baseCurrency || "USD"} to {conversionCurrency || "EUR"} is {convertedAmount?.toFixed(2)} for {numberOfYears} year/years
                </p>
            </div>
            <div>
                <button onClick={() => currencyPerYear(1)}>1 Year</button>
                <button onClick={() => currencyPerYear(3)}>3 Years</button>
                <button onClick={() => currencyPerYear(5)}>5 Years</button>
                <button onClick={() => currencyPerYear(10)}>10 Years</button>
            </div>
        </section>
    );
};


export default Travel;
