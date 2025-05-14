# US Bank Statements GL Processor

A professional React application for processing US Bank statements and converting them to Excel format for General Ledger integration.

## Features

- **Modern UI**: Professional design tailored for accounting departments
- **Dark/Light Theme**: Toggle between dark and light themes
- **File Upload Options**: Upload files via file path or file manager
- **Single/Multiple File Processing**: Toggle between single and multiple file processing
- **Excel Viewer**: View processed Excel files directly in the application
- **Download Functionality**: Download processed Excel files

## Pages

1. **Landing Page**: Upload bank statement PDFs
2. **Output Page**: View and download processed Excel files

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

## Project Structure

```
us-bank-gl-processor/
├── public/
│   └── data/
│       └── DetailedStatement_april.xlsx
├── src/
│   ├── components/
│   │   ├── ExcelViewer.tsx
│   │   ├── FileUploader.tsx
│   │   └── Header.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   └── OutputPage.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- React
- TypeScript
- Vite
- Material-UI
- React Router
- XLSX (for Excel file handling)
- File-Saver (for downloading files)

## Notes

- This is a frontend-only application. No backend functionality is implemented yet.
- For demonstration purposes, the application uses a sample Excel file (`DetailedStatement_april.xlsx`) for the output display.
