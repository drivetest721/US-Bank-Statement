import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import LandingPage from './pages/LandingPage';
import OutputPage from './pages/OutputPage';

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
    <Router>
      <React.Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/output" element={<OutputPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
