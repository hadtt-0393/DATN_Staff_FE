import React from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes';
import ThemeProvider from './theme';
// import './App.css';

export function App() {
  useScrollToTop();
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
