import React from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes';
import ThemeProvider from './theme';
import { ToastContainer } from 'react-toastify';
// import './App.css';

export function App() {
  useScrollToTop();
  return (
    <ThemeProvider>
      <Router />
      <ToastContainer position="top-right" />

    </ThemeProvider>
  );
}

export default App;
