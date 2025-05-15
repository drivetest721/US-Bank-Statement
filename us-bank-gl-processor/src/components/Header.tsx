import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useTheme as useMuiTheme,
  alpha
} from '@mui/material';
import { Brightness4, Brightness7, AccountBalance } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        background: mode === 'light'
          ? `linear-gradient(120deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.primary.dark} 100%)`
          : `linear-gradient(120deg, ${muiTheme.palette.primary.dark} 0%, ${alpha(muiTheme.palette.primary.main, 0.85)} 100%)`,
        boxShadow: mode === 'light'
          ? '0 4px 20px rgba(0, 0, 0, 0.08)'
          : '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AccountBalance
            sx={{
              mr: 1.5,
              fontSize: 28,
              color: '#FFFFFF',
              filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.2))'
            }}
          />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#FFFFFF',
              textShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)'
            }}
          >
            {title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'rotate(30deg)'
              }
            }}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
