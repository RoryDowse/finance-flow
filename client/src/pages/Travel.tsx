// src/components/Travel.tsx
import React, { useState, useEffect } from 'react';
import { Currency } from './interfaces/Currency.Interface.tsx';

const Travel: React.FC = () => {
   
    const [currency, setCurrency] = useState<string>('USD');
    const [convertedAmount, setConvertedAmount] = useState<number>();
    const [numberOfYears, setNumberOfYears] = useState<number>(1);
   
    const exchangeKey = import.meta.env.VITE_EXCHANGE_API_KEY;


    const searchCurrencyType = async (currency: string) => {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeKey}/latest/${currency}`)


            if (!response.ok) {
                throw new Error('invalid API response, check the network tab');
            }


            const data: Currency = await response.json();

            const rate = data.conversion_rates[currency];

            if (!rate) {
                throw new Error(`Invalid currency type: ${currency}`);
            }
            const amountToConvert = 10000; // This number will be the "Cashflow" from the expenses page
            const converted = rate * amountToConvert;

            setConvertedAmount(converted);

        } catch (err) {
            console.log('an error occured when trying to fetch currency data', err);
            setConvertedAmount(null);
        }
    };

    // This function will take the number of years the user chooses and convert the numbers displayed for convertedAmount
    const currencyPerYear = (numberOfYears: number) => {
        const newConvertedAmount = numberOfYears * convertedAmount;
        newCurrencyAmount(newConvertedAmount);
    }


    // Handles the Search bar Input, setting Currency to be whatever they type.
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value.toUpperCase());
    };

    // Handles submission for search field
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchCurrencyType(currency);
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={currency}
                onChange={handleInputChange}
                placeholder="Enter Currency Type"
                />
                <button type="submit">Search</button>
            </form>
            <div>
                <h2>Currency Exchange Rates</h2>
                <p>
                    Your Cashflow Converted from USD to {currency} is {convertedAmount?.toFixed(2)} for {numberOfYears}
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
