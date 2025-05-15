# US Bank Statements GL Processor

A professional React application for processing US Bank statements and converting them to Excel format for General Ledger integration.

## Features

- **Modern UI**: Professional design tailored for accounting departments
- **Dark/Light Theme**: Toggle between dark and light themes
- **Simple File Upload**: Easy file upload via file browser
- **Download Functionality**: Download processed Excel files directly from the main page

## Pages

1. **Landing Page**: Upload bank statement PDFs and download processed Excel files

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
│   │   ├── FileUploader.tsx
│   │   └── Header.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── pages/
│   │   └── LandingPage.tsx
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
- For demonstration purposes, the application generates a sample Excel file with hardcoded data when the download button is clicked.
