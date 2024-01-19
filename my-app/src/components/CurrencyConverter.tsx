import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IConverter {
  conversionRates: Record<string, number>;
}

const CurrencyConverter: React.FC<IConverter> = ({ conversionRates }) => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('USDT');
  const [toCurrency, setToCurrency] = useState<string>('USDT');
  const [convertedAmount, setConvertedAmount] = useState<string>('');

  const formatNumber = (value: number): string => {
    return value.toLocaleString('en-US', { minimumFractionDigits: 6, maximumFractionDigits: 6 }) as string;
  };

  const fetchConversionRate = async (fromCurrency: string, toCurrency: string) => {
    try {
      const apiKey = '42537070-32c3-4239-88ce-2339639a930f';
      const secretKey = 'BCB0F8D77E62A3035EB68872AE14D34F';

      const response = await axios.get(
        `https://www.okex.com/api/spot/v3/instruments/${fromCurrency}-${toCurrency}/ticker`,
        {
          headers: {
            'OK-ACCESS-KEY': apiKey,
            'OK-ACCESS-SIGN': 'SIGNATURE', // Calculate this dynamically based on your request
            'OK-ACCESS-TIMESTAMP': 'TIMESTAMP', // Replace with your actual timestamp
            'OK-ACCESS-PASSPHRASE': 'YOUR_PASSPHRASE', // Replace with your passphrase
          },
        }
      );

      const rate = parseFloat(response.data.last);
      setConvertedAmount(formatNumber(rate * amount));
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchConversionRate(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency, amount]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  };

  return (
    <div>
      <label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
      <label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      </label>
      <label>
        <input type="text" value={convertedAmount} readOnly />
      </label>
      <label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
        </select>
      </label>
    </div>
  );
};


export default CurrencyConverter;