import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import LandingPage from './pages/LandingPage';
import { ThemeProvider } from './context/ThemeContext';

// Simple loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  }}>
    <CircularProgress />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
