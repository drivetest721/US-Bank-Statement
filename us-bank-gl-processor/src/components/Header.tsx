import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar position="static" elevation={0} style={{ marginBottom: '2rem' }}>
      <Toolbar>
        <Typography variant="h5" component="h1" style={{ fontWeight: 600, flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
