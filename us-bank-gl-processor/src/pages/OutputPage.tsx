import React from 'react';
import { Container, Box, Typography, Button, Chip } from '@mui/material';
import { ArrowBack, Description } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ExcelViewer from '../components/ExcelViewer';

const OutputPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get file information from navigation state, if available
  const fileInfo = location.state as {
    filePath: string | null;
    fileName: string | null;
    uploadMethod: 'path' | 'fileManager'
  } | null;

  // Determine the source file name for display
  let sourceFileName = 'DetailedStatement_april.xlsx';
  if (fileInfo?.fileName) {
    sourceFileName = fileInfo.fileName;
  } else if (fileInfo?.filePath) {
    const pathParts = fileInfo.filePath.split(/[\/\\]/);
    sourceFileName = pathParts[pathParts.length - 1] || fileInfo.filePath;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header title="US Bank Statements GL Processor" />

      <Container maxWidth="lg" style={{ flex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
          >
            Back to Upload
          </Button>

          <Typography variant="h5" component="h1" style={{ fontWeight: 500 }}>
            Processing Results
          </Typography>

          <div style={{ width: '100px' }}></div> {/* Empty div for alignment */}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <Typography variant="body1" style={{ marginBottom: '1rem' }}>
            Your bank statement has been successfully processed. The extracted data is displayed below and is ready for download.
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Typography variant="body2" color="textSecondary">
              Source file:
            </Typography>
            <Chip
              icon={<Description fontSize="small" />}
              label={sourceFileName}
              variant="outlined"
              size="small"
            />
          </div>

          <div style={{
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            border: '1px dashed #ccc'
          }}>
            <Typography variant="body2" color="textSecondary">
              <strong>Note:</strong> Since this is a demonstration without backend processing, sample bank statement data is shown below.
              In a production environment, this would be the actual data extracted from your PDF file.
            </Typography>
          </div>
        </div>

        {/* Pass the file name to the ExcelViewer for download purposes */}
        <ExcelViewer filePath="" fileName={sourceFileName} />
      </Container>

      <footer style={{
        padding: '1rem 0',
        textAlign: 'center',
        borderTop: '1px solid #eaeaea'
      }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} US Bank GL Processing Tool
        </Typography>
      </footer>
    </div>
  );
};

export default OutputPage;
