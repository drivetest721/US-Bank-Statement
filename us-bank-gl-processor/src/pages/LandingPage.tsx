import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import Header from '../components/Header';
import FileUploader from '../components/FileUploader';

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="US Bank Statements GL Processor" />
      
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500 }}>
            Bank Statement Processing
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Upload your US Bank statement PDF files to automatically process and convert them to Excel format for General Ledger integration.
          </Typography>
        </Box>
        
        <FileUploader />
        
        <Paper 
          elevation={0} 
          sx={{ 
            mt: 4, 
            p: 3, 
            backgroundColor: (theme) => 
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Note:</strong> This application processes US Bank statement PDFs and extracts transaction data into a structured Excel format suitable for General Ledger import. Supported file formats: PDF.
          </Typography>
        </Paper>
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          textAlign: 'center',
          borderTop: 1, 
          borderColor: 'divider'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} US Bank GL Processing Tool
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
