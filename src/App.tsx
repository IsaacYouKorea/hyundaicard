import React, { useState } from 'react';
import './App.css';
import Calendar from './components/calendar';
import DaySummary from './components/day-summary';
import Header from './components/header';
import PaymentDetail from './components/payment-detail';
import { AppProvider, usePaymentDispatch } from './context';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header/>
        <Calendar/>
        <DaySummary/>
        {/* <PaymentDetail closePopup={} paymentData={}></PaymentDetail> */}
      </div>
    </AppProvider>
  );
}

export default App;
