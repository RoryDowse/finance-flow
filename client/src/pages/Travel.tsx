// src/components/Travel.tsx
import React, { useState, useEffect } from 'react';
import { Currency } from './interfaces/Currency.Interface';

const Travel: React.FC = () => {
    
    const [currency, setCurrency] = useState<string>('USD');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    
    const exchangeKey = process.env.EXCHANGE_API_KEY;

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


    return (
        <section>
            <div>
                <h2>Currency Exchange</h2>
            </div>
        </section>
    );
};

export default Travel;
