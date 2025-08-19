import React, { useState, Component } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import theme from './theme';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 3 }}>
          <Typography color="error">
            Something went wrong. Please refresh the page.
          </Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <AppBar
            position="fixed"
            sx={{
              display: { sm: 'none' },
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Labour Attendance
              </Typography>
            </Toolbar>
          </AppBar>
          <Sidebar
            setSelectedSite={setSelectedSite}
            selectedSite={selectedSite}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3 },
              bgcolor: 'background.default',
              width: { xs: '100%', sm: 'calc(100% - 260px)' },
              mt: { xs: '56px', sm: 0 },
            }}
          >
            <AppRoutes
              selectedSite={selectedSite}
              setSelectedSite={setSelectedSite}
            />
          </Box>
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
