import React, { useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import './App.css';
import Calendar from './components/calendar';
import DaySummary from './components/DaySummary';
import Header from './components/header';
import PaymentDetail from './components/payment-detail';
import { AppProvider, usePaymentDispatch } from './context';
import { darkTheme } from './styles/theme';
import GlobalStyle from "./styles/global-style";

const StyledApp = styled.div`
  ${({ theme }) => {
    return css`
      display: flex;
      flex-direction: column;
      height: 100%;
    `
  }}
`


function App() {
  // const [theme, setTheme] = useState(darkTheme);
  return (
    <AppProvider>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <StyledApp>
          <Header />
          <Calendar />
          <DaySummary />
          <PaymentDetail />
        </StyledApp>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
