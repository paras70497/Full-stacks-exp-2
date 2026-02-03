import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Toolbar, Typography, Button, Container, Tabs, Tab } from '@mui/material';
import { Dashboard as DashboardIcon, PersonAdd, Menu as MenuIcon } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { customTheme } from './theme';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            background: 'linear-gradient(135deg, #0a7ea4 0%, #065a75 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ff6b9d 0%, #c9184a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                  }}
                >
                  P
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
                  ProDash
                </Typography>
              </Box>
              
              <Tabs 
                value={currentTab} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': { 
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 600,
                    minHeight: 64,
                  },
                  '& .Mui-selected': { 
                    color: '#fff !important' 
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#fff',
                    height: 3,
                  }
                }}
              >
                <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
                <Tab icon={<PersonAdd />} iconPosition="start" label="Registration" />
              </Tabs>

              <Button
                variant="outlined"
                startIcon={<MenuIcon />}
                sx={{
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Menu
              </Button>
            </Toolbar>
          </Container>
        </AppBar>

        {currentTab === 0 && <Dashboard />}
        {currentTab === 1 && <RegistrationForm />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
