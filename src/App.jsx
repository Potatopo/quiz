import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { GameProvider } from './context/GameContext';
import GameManager from './components/GameManager';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GameProvider>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Вікторина
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ 
          width: '1140px', 
          mx: 'auto', 
          mt: 4, 
          mb: 4,
          px: 2
        }}>
          <GameManager />
        </Box>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;