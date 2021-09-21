import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import Calendar from './components/calendar';
import DaySummary from './components/DaySummary';
import Header from './components/header';
import PaymentDetail from './components/payment-detail';
import { AppProvider, usePaymentDispatch } from './context';
import { darkTheme } from './styles/theme';

function App() {
  const [theme, setTheme] = useState(darkTheme);

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Calendar />
          <DaySummary />
          <PaymentDetail />
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
