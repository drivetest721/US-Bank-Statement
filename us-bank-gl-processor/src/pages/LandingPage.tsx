import React, { useState, useEffect, useCallback } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import Header from '../components/Header';
import FileUploader from '../components/FileUploader';
import HistoryPanel from '../components/HistoryPanel';
import type { HistoryItem } from '../components/HistoryPanel';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const LandingPage: React.FC = () => {
  // State for history items
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    // Try to load history from localStorage
    const savedHistory = localStorage.getItem('uploadHistory');
    if (savedHistory) {
      try {
        // Parse the saved history and convert date strings back to Date objects
        const parsed = JSON.parse(savedHistory);
        return parsed.map((item: any) => ({
          ...item,
          uploadDate: new Date(item.uploadDate)
        }));
      } catch (error) {
        console.error('Error parsing history from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // State for selected history item
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('uploadHistory', JSON.stringify(history));
  }, [history]);

  // Handler for adding a new item to history
  const addToHistory = useCallback((fileName: string, fileSize?: string) => {
    const newItem: HistoryItem = {
      id: generateId(),
      fileName,
      uploadDate: new Date(),
      fileSize
    };

    setHistory(prev => [newItem, ...prev]);
    setSelectedItemId(newItem.id);
    return newItem;
  }, []);

  // Handler for selecting an item from history
  const handleSelectItem = useCallback((item: HistoryItem) => {
    setSelectedItemId(item.id);
    // Additional logic for loading the selected item could go here
  }, []);

  // Handler for downloading an item from history
  const handleDownloadItem = useCallback((item: HistoryItem) => {
    try {
      // Sample data for the Excel file - this would be replaced with actual processed data
      const headers = ['Date', 'Description', 'Reference', 'Amount', 'Balance'];
      const rows = [
        ['2023-04-01', 'Opening Balance', 'REF001', '', '$5,000.00'],
        ['2023-04-02', 'Grocery Store - Walmart', 'POS-1234', '-$120.50', '$4,879.50'],
        ['2023-04-03', 'Gas Station - Shell', 'POS-1235', '-$45.00', '$4,834.50'],
        ['2023-04-05', 'Salary Deposit - ABC Corp', 'DEP-5678', '+$3,500.00', '$8,334.50'],
        ['2023-04-07', 'Restaurant - Olive Garden', 'POS-1236', '-$85.75', '$8,248.75'],
        ['2023-04-10', 'Utility Bill - Electric Company', 'ACH-9012', '-$150.00', '$8,098.75'],
        ['2023-04-12', 'Online Shopping - Amazon', 'POS-1237', '-$200.00', '$7,898.75'],
        ['2023-04-15', 'Insurance Payment - State Farm', 'ACH-9013', '-$125.00', '$7,773.75'],
        ['2023-04-18', 'Coffee Shop - Starbucks', 'POS-1238', '-$15.50', '$7,758.25'],
        ['2023-04-20', 'Phone Bill - Verizon', 'ACH-9014', '-$85.00', '$7,673.25'],
        ['2023-04-30', 'End of Month Balance', 'BAL-0430', '', '$7,673.25']
      ];

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Convert the data to a worksheet
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Bank Statement');

      // Generate the Excel file
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

      // Convert to Blob and save
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Prepare the file name
      let downloadName = item.fileName;
      if (!downloadName.toLowerCase().endsWith('.xlsx')) {
        downloadName = `${downloadName.replace(/\.pdf$/i, '')}.xlsx`;
      }

      saveAs(blob, downloadName);
    } catch (err) {
      console.error('Error in download handler:', err);
      alert('Download failed. Please try again.');
    }
  }, []);

  // Handler for deleting an item from history
  const handleDeleteItem = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    if (selectedItemId === id) {
      setSelectedItemId(undefined);
    }
  }, [selectedItemId]);
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* App header with title - spans the entire width */}
      <Header title="US Bank Statements GL Processor" />

      {/* Main layout with sidebar and content */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flex: 1 }}>
        {/* Left side - History Panel (full height) */}
        <Box
          sx={{
            width: { xs: '100%', md: '320px' },
            borderRight: { xs: 0, md: 1 },
            borderBottom: { xs: 1, md: 0 },
            borderColor: 'divider',
            height: { xs: 'auto', md: '100%' },
            minHeight: { xs: '300px', md: 'calc(100vh - 64px)' }, // Subtract header height
            display: 'flex',
            flexDirection: 'column',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.01)',
            position: { xs: 'static', md: 'sticky' },
            top: 64, // Position below header
            left: 0
          }}
        >
          <HistoryPanel
            history={history}
            onSelectItem={handleSelectItem}
            onDownloadItem={handleDownloadItem}
            onDeleteItem={handleDeleteItem}
            selectedItemId={selectedItemId}
          />
        </Box>

        {/* Right side - Content area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {/* Content header */}
          <Box sx={{ py: 3, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg">
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500 }}>
                Bank Statement Processing
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Upload your US Bank statement PDF files to automatically process and convert them to Excel format for General Ledger integration.
              </Typography>
            </Container>
          </Box>

          {/* Main content */}
          <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
            <Container maxWidth="md" sx={{ mx: 'auto' }}>
              <FileUploader
                onFileProcessed={(fileName, fileSize) => {
                  // Add the processed file to history
                  addToHistory(fileName, fileSize);
                }}
              />

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
          </Box>

          {/* Footer - only in the content area */}
          <Box
            component="footer"
            sx={{
              py: 2,
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
      </Box>
    </Box>
  );
};

export default LandingPage;
