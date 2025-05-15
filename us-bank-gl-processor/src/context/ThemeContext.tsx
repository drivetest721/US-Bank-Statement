import React, { createContext, useState, useContext, ReactNode, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Define custom colors for a more professional banking/financial look
const bankingColors = {
  light: {
    primary: '#0A4B94', // Deep blue
    primaryLight: '#1976d2',
    primaryDark: '#072F5F',
    secondary: '#00A86B', // Money green
    secondaryLight: '#4CD3A5',
    secondaryDark: '#007849',
    accent: '#FFB81C', // Gold accent
    error: '#D32F2F',
    warning: '#FFA000',
    info: '#0288D1',
    success: '#388E3C',
    background: '#F8FAFC',
    paper: '#FFFFFF',
    border: '#E0E7FF',
    divider: '#E5E8EC'
  },
  dark: {
    primary: '#2196F3', // Brighter blue for dark mode
    primaryLight: '#64B5F6',
    primaryDark: '#1565C0',
    secondary: '#00E676', // Brighter green for dark mode
    secondaryLight: '#69F0AE',
    secondaryDark: '#00C853',
    accent: '#FFD54F', // Brighter gold for dark mode
    error: '#F44336',
    warning: '#FFC107',
    info: '#29B6F6',
    success: '#4CAF50',
    background: '#0A1929',
    paper: '#132F4C',
    border: '#1E4976',
    divider: '#234E6D'
  }
};

// Create theme once outside component to improve performance
const getTheme = (mode: ThemeMode) => {
  const colors = mode === 'light' ? bankingColors.light : bankingColors.dark;

  return responsiveFontSizes(createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: colors.primaryLight,
        dark: colors.primaryDark,
        contrastText: '#ffffff',
      },
      secondary: {
        main: colors.secondary,
        light: colors.secondaryLight,
        dark: colors.secondaryDark,
        contrastText: '#ffffff',
      },
      error: {
        main: colors.error,
      },
      warning: {
        main: colors.warning,
      },
      info: {
        main: colors.info,
      },
      success: {
        main: colors.success,
      },
      background: {
        default: colors.background,
        paper: colors.paper,
      },
      divider: colors.divider,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.025em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: mode === 'light' ? '#f1f1f1' : '#1e1e1e',
            },
            '&::-webkit-scrollbar-thumb': {
              background: mode === 'light' ? '#c1c1c1' : '#555',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: mode === 'light' ? '#a1a1a1' : '#777',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: mode === 'light'
              ? '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.1)'
              : '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: mode === 'light'
                ? '0px 4px 8px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)'
                : '0px 4px 8px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            '&.MuiButton-containedPrimary': {
              background: mode === 'light'
                ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
              color: '#ffffff',
            },
            '&.MuiButton-containedSecondary': {
              background: mode === 'light'
                ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`
                : `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryLight} 100%)`,
              color: '#ffffff',
            },
          },
          outlined: {
            '&.MuiButton-outlinedPrimary': {
              borderColor: colors.primary,
              borderWidth: 1,
              '&:hover': {
                borderWidth: 1,
                borderColor: colors.primaryDark,
              }
            },
            '&.MuiButton-outlinedSecondary': {
              borderColor: colors.secondary,
              borderWidth: 1,
              '&:hover': {
                borderWidth: 1,
                borderColor: colors.secondaryDark,
              }
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light'
              ? '0px 4px 20px rgba(0, 0, 0, 0.05), 0px 2px 8px rgba(0, 0, 0, 0.05)'
              : '0px 4px 20px rgba(0, 0, 0, 0.3), 0px 2px 8px rgba(0, 0, 0, 0.2)',
            border: mode === 'light' ? `1px solid ${colors.border}` : 'none',
          },
          elevation1: {
            boxShadow: mode === 'light'
              ? '0px 2px 10px rgba(0, 0, 0, 0.03), 0px 1px 4px rgba(0, 0, 0, 0.03)'
              : '0px 2px 10px rgba(0, 0, 0, 0.2), 0px 1px 4px rgba(0, 0, 0, 0.15)',
          },
          elevation2: {
            boxShadow: mode === 'light'
              ? '0px 4px 16px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04)'
              : '0px 4px 16px rgba(0, 0, 0, 0.25), 0px 2px 6px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '12px 16px',
            borderBottom: `1px solid ${colors.divider}`,
          },
          head: {
            fontWeight: 600,
            backgroundColor: mode === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '2px 0',
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              backgroundColor: mode === 'light'
                ? 'rgba(10, 75, 148, 0.08)'
                : 'rgba(33, 150, 243, 0.16)',
              '&:hover': {
                backgroundColor: mode === 'light'
                  ? 'rgba(10, 75, 148, 0.12)'
                  : 'rgba(33, 150, 243, 0.24)',
              },
            },
            '&:hover': {
              backgroundColor: mode === 'light'
                ? 'rgba(0, 0, 0, 0.04)'
                : 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: colors.divider,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          standardSuccess: {
            backgroundColor: mode === 'light' ? 'rgba(56, 142, 60, 0.1)' : 'rgba(76, 175, 80, 0.15)',
            border: `1px solid ${mode === 'light' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(76, 175, 80, 0.3)'}`,
          },
          standardError: {
            backgroundColor: mode === 'light' ? 'rgba(211, 47, 47, 0.1)' : 'rgba(244, 67, 54, 0.15)',
            border: `1px solid ${mode === 'light' ? 'rgba(211, 47, 47, 0.2)' : 'rgba(244, 67, 54, 0.3)'}`,
          },
        },
      },
    },
  }));
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialMode = (): ThemeMode => {
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      return savedMode;
    }
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
