import React from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes';
// import './App.css';

export function App() {
  useScrollToTop();
  return (
    <Router/>
  );
}

export default App;
