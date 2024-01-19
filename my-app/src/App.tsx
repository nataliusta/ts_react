import React from 'react';

import CurrencyConverter from './components/CurrencyConverter';
import './App.css';

function App() {

  const conversionRates = {
    USDT: 1,
    BTC: 0.000045, 
    ETH: 0.0012,  
  };

  return (
    <div className="App-header">
      <CurrencyConverter conversionRates={conversionRates} />
    </div>
  );
}

export default App;
