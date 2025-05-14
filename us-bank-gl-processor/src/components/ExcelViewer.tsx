import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button
} from '@mui/material';
import { Download } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExcelViewerProps {
  filePath: string;
  fileName?: string;
}

// Simple ExcelViewer component with hardcoded data
const ExcelViewer: React.FC<ExcelViewerProps> = ({ fileName = 'DetailedStatement_april.xlsx' }) => {
  // Hardcoded sample data - this will always be displayed
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
    ['2023-04-22', 'Movie Tickets - AMC', 'POS-1239', '-$35.00', '$7,638.25'],
    ['2023-04-25', 'Gym Membership - Planet Fitness', 'ACH-9015', '-$50.00', '$7,588.25'],
    ['2023-04-28', 'Pharmacy - CVS', 'POS-1240', '-$65.25', '$7,523.00'],
    ['2023-04-30', 'ATM Withdrawal', 'ATM-5678', '-$200.00', '$7,323.00'],
    ['2023-04-30', 'Transfer to Savings', 'TRF-1234', '-$500.00', '$6,823.00'],
    ['2023-04-30', 'End of Month Balance', 'BAL-0430', '', '$6,823.00']
  ];

  // Handle download button click
  const handleDownload = () => {
    console.log('Download button clicked');

    try {
      // Prepare the file name
      let downloadName = fileName;
      if (!downloadName.toLowerCase().endsWith('.xlsx')) {
        downloadName = `${downloadName}.xlsx`;
      }

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
      saveAs(blob, downloadName);
    } catch (err) {
      console.error('Error in download handler:', err);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Processed Statement
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={handleDownload}
        >
          Download Excel
        </Button>
      </Box>

      <TableContainer sx={{ maxHeight: 440, mb: 2 }}>
        <Table stickyHeader aria-label="excel data table" size="small">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#f5f5f5',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ExcelViewer;
