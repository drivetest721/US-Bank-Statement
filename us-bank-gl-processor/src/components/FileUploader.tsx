import React, { useState, ChangeEvent, useCallback, memo } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Alert
} from '@mui/material';
import { UploadFile, FolderOpen, Download } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface FileUploaderProps {
  onFileProcessed?: (fileName: string, fileSize?: string) => void;
}

// Use memo to prevent unnecessary re-renders
const FileUploader: React.FC<FileUploaderProps> = memo(({ onFileProcessed }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  // Use useCallback to memoize event handlers
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  }, []);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setIsFileUploaded(false);
    setUploadedFileName('');
    setError(null);
  }, []);

  // Handle download button click
  const handleDownload = useCallback(() => {
    console.log('Download button clicked');

    try {
      // Prepare the file name
      let downloadName = uploadedFileName;
      if (!downloadName.toLowerCase().endsWith('.xlsx')) {
        downloadName = `${downloadName}.xlsx`;
      }

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
      saveAs(blob, downloadName);
    } catch (err) {
      console.error('Error in download handler:', err);
      alert('Download failed. Please try again.');
    }
  }, [uploadedFileName]);

  const handleUpload = useCallback(() => {
    // For demonstration purposes, we'll process the file here
    // In a real application, we would validate and process the file here

    // Validate input and show error if needed
    if (!selectedFile) {
      setError('Please select a file before proceeding');
      return;
    }

    // Clear any previous errors
    setError(null);

    // Log what we're "processing" for demonstration
    console.log('Processing selected file:', selectedFile.name);
    setUploadedFileName(selectedFile.name || 'processed_statement.xlsx');

    // Set file as uploaded
    setIsFileUploaded(true);

    // Calculate file size in KB or MB for display
    const fileSize = selectedFile.size < 1024 * 1024
      ? `${Math.round(selectedFile.size / 1024)} KB`
      : `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`;

    // Notify parent component that a file has been processed
    if (onFileProcessed) {
      onFileProcessed(selectedFile.name, fileSize);
    }
  }, [selectedFile, setError, onFileProcessed]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 800,
        mx: 'auto',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '6px',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          mb: 3,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          '&::after': {
            content: '""',
            display: 'block',
            height: '2px',
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main}80, transparent)`,
            flex: 1,
            ml: 2
          }
        }}
      >
        Upload Bank Statement
      </Typography>

      <Box
        sx={{
          mb: 4,
          p: 3,
          border: '2px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          textAlign: 'center',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(25, 118, 210, 0.04)'
                : 'rgba(33, 150, 243, 0.08)',
          }
        }}
      >
        <input
          accept=".pdf"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" style={{ width: '100%', cursor: 'pointer' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FolderOpen sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag & Drop Files Here
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              or
            </Typography>
            <Button
              variant="outlined"
              component="span"
              sx={{
                mt: 1,
                borderRadius: 4,
                px: 3,
                py: 1,
                fontWeight: 600,
                borderWidth: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(10, 75, 148, 0.04)'
                      : 'rgba(33, 150, 243, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              Browse Files
            </Button>
          </Box>
        </label>

        {selectedFile && (
          <Box
            sx={{
              mt: 2,
              p: 1,
              borderRadius: 1,
              bgcolor: 'background.default',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Selected: {selectedFile.name}
            </Typography>
          </Box>
        )}

        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
          Supported file format: PDF
        </Typography>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          {error}
        </Alert>
      )}

      {isFileUploaded && (
        <Box
          sx={{
            mb: 3,
            mt: 2,
            animation: 'slideUp 0.4s ease-out'
          }}
        >
          <Alert
            severity="success"
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                File processed successfully
              </Typography>
              <Typography variant="body2">
                {uploadedFileName}
              </Typography>
            </Box>
          </Alert>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReset}
              sx={{
                borderRadius: 4,
                px: 3,
                fontWeight: 600,
                borderWidth: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(10, 75, 148, 0.04)'
                      : 'rgba(33, 150, 243, 0.08)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              Process Another File
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Download sx={{ color: '#ffffff' }} />}
              onClick={handleDownload}
              size="large"
              sx={{
                borderRadius: 4,
                px: 3,
                color: '#ffffff',
                fontWeight: 600,
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: (theme) =>
                  theme.palette.mode === 'light'
                    ? '0 4px 14px rgba(0, 168, 107, 0.4)'
                    : '0 4px 14px rgba(0, 230, 118, 0.4)',
                '&:hover': {
                  background: (theme) =>
                    theme.palette.mode === 'light'
                      ? `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`
                      : `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light} 100%)`,
                  boxShadow: (theme) =>
                    theme.palette.mode === 'light'
                      ? '0 6px 20px rgba(0, 168, 107, 0.6)'
                      : '0 6px 20px rgba(0, 230, 118, 0.6)',
                }
              }}
            >
              Download Excel
            </Button>
          </Box>
        </Box>
      )}

      {!isFileUploaded && (
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFile sx={{ color: '#ffffff' }} />}
            onClick={handleUpload}
            size="large"
            disabled={!selectedFile}
            sx={{
              borderRadius: 4,
              px: 4,
              py: 1.2,
              color: '#ffffff',
              fontWeight: 600,
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
                  : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              boxShadow: (theme) =>
                theme.palette.mode === 'light'
                  ? '0 4px 14px rgba(10, 75, 148, 0.3)'
                  : '0 4px 14px rgba(33, 150, 243, 0.3)',
              '&:hover': {
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                boxShadow: (theme) =>
                  theme.palette.mode === 'light'
                    ? '0 6px 20px rgba(10, 75, 148, 0.4)'
                    : '0 6px 20px rgba(33, 150, 243, 0.4)',
              },
              '&.Mui-disabled': {
                background: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.12)'
                    : 'rgba(255, 255, 255, 0.12)',
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.26)'
                    : 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            Upload & Process
          </Button>
        </Grid>
      )}
    </Paper>
  );
});

export default FileUploader;
