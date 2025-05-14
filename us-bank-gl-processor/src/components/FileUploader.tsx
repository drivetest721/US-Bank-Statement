import React, { useState, ChangeEvent, useCallback, memo } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Grid,
  Divider,
  FormControl,
  RadioGroup,
  Radio,
  Alert
} from '@mui/material';
import { UploadFile, FolderOpen } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Use memo to prevent unnecessary re-renders
const FileUploader: React.FC = memo(() => {
  const [filePath, setFilePath] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isMultipleFiles, setIsMultipleFiles] = useState<boolean>(false);
  const [uploadMethod, setUploadMethod] = useState<'path' | 'fileManager'>('fileManager');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Use useCallback to memoize event handlers
  const handleFilePathChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilePath(e.target.value);
    setError(null);
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (isMultipleFiles) {
        // Handle multiple files
        setSelectedFile(e.target.files[0]); // For now, just use the first file
      } else {
        setSelectedFile(e.target.files[0]);
      }
      setError(null);
    }
  }, [isMultipleFiles]);

  const handleUploadMethodChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUploadMethod(e.target.value as 'path' | 'fileManager');
    setError(null);
  }, []);

  const handleMultipleFilesChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsMultipleFiles(e.target.checked);
  }, []);

  const handleUpload = useCallback(() => {
    // For demonstration purposes, we'll always navigate to the output page
    // In a real application, we would validate and process the file here

    // Validate input and show error if needed
    if (uploadMethod === 'path' && !filePath.trim()) {
      setError('Please enter a file path before proceeding');
      return;
    }

    if (uploadMethod === 'fileManager' && !selectedFile) {
      setError('Please select a file before proceeding');
      return;
    }

    // Clear any previous errors
    setError(null);

    // Log what we're "processing" for demonstration
    if (uploadMethod === 'path') {
      console.log('Processing file from path:', filePath);
    } else {
      console.log('Processing selected file:', selectedFile?.name);
    }

    // Navigate to the output page with file information
    navigate('/output', {
      state: {
        filePath: uploadMethod === 'path' ? filePath : null,
        fileName: selectedFile ? selectedFile.name : null,
        uploadMethod
      }
    });
  }, [uploadMethod, filePath, selectedFile, navigate, setError]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
        Upload Bank Statement
      </Typography>

      <Box sx={{ mb: 4 }}>
        <FormControl component="fieldset">
          <Typography variant="subtitle2" gutterBottom>
            Select Upload Method:
          </Typography>
          <RadioGroup
            row
            name="upload-method"
            value={uploadMethod}
            onChange={handleUploadMethodChange}
          >
            <FormControlLabel
              value="path"
              control={<Radio />}
              label="File Path"
            />
            <FormControlLabel
              value="fileManager"
              control={<Radio />}
              label="File Manager"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {uploadMethod === 'path' ? (
        <TextField
          fullWidth
          label="Enter File Path"
          variant="outlined"
          value={filePath}
          onChange={handleFilePathChange}
          placeholder="C:/path/to/your/file.pdf"
          sx={{ mb: 3 }}
        />
      ) : (
        <Box sx={{ mb: 3 }}>
          <input
            accept=".pdf"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            multiple={isMultipleFiles}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<FolderOpen />}
              sx={{ mb: 2 }}
            >
              Browse Files
            </Button>
          </label>

          {selectedFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {selectedFile.name}
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Supported file format: PDF
          </Typography>
        </Box>
      )}

      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isMultipleFiles}
              onChange={handleMultipleFilesChange}
              color="primary"
            />
          }
          label="Process Multiple Files"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          startIcon={<UploadFile />}
          onClick={handleUpload}
          size="large"
        >
          Upload & Process
        </Button>
      </Grid>
    </Paper>
  );
});

export default FileUploader;
