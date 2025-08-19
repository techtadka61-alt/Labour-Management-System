import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Dashboard,
  PersonAdd,
  CheckCircle,
  ListAlt,
  Visibility,
} from '@mui/icons-material';
import { getSites } from '../services/api';
import { toast } from 'react-toastify';

function Sidebar({
  setSelectedSite,
  selectedSite,
  mobileOpen,
  handleDrawerToggle,
}) {
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      setIsLoading(true);
      try {
        const response = await getSites();
        console.log('Sidebar Sites Response:', response.data);
        if (Array.isArray(response.data)) {
          setSites(response.data);
          if (response.data.length === 0) {
            toast.info('No sites found. Please add a site via Dashboard.');
          } else if (!selectedSite && response.data.length > 0) {
            const defaultSite = response.data[0];
            console.log('Setting default site:', defaultSite._id);
            setSelectedSite(defaultSite);
          }
        } else {
          console.error('Sidebar: Invalid sites data:', response.data);
          toast.error('Invalid sites data received');
          setSites([]);
        }
      } catch (error) {
        console.error(
          'Sidebar Fetch Error:',
          error.message,
          error.response?.data
        );
        toast.error('Failed to fetch sites. Check backend connection.');
        setSites([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSites();
  }, [setSelectedSite, selectedSite]);

  const handleSiteChange = (event) => {
    const siteId = event.target.value;
    console.log('Selected site ID:', siteId);
    const site = sites.find((s) => s._id === siteId);
    setSelectedSite(site || null);
    if (mobileOpen) handleDrawerToggle();
  };

  const drawerContent = (
    <motion.div
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, color: '#1a3c34' }}
        >
          Labour Attendance
        </Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Site</InputLabel>
          <Select
            value={selectedSite?._id || ''}
            onChange={handleSiteChange}
            label="Select Site"
            disabled={isLoading}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': { borderColor: '#1976d2' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2' },
              },
            }}
          >
            <MenuItem value="">
              <em>Select a site</em>
            </MenuItem>
            {sites.length > 0 ? (
              sites.map((site) => (
                <MenuItem key={site._id} value={site._id}>
                  {site.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No sites available</MenuItem>
            )}
          </Select>
        </FormControl>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        <List>
          {[
            { path: '/dashboard', text: 'Dashboard', icon: <Dashboard /> },
            { path: '/add-labour', text: 'Add Labour', icon: <PersonAdd /> },
            {
              path: '/mark-attendance',
              text: 'Mark Attendance',
              icon: <CheckCircle />,
            },
            { path: '/show-labour', text: 'Show Labour', icon: <ListAlt /> },
            {
              path: '/view-attendance',
              text: 'View Attendance',
              icon: <Visibility />,
            },
          ].map((item) => (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              selected={window.location.pathname === item.path}
              onClick={mobileOpen ? handleDrawerToggle : undefined}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: '#1976d2',
                  color: '#fff',
                  '&:hover': { bgcolor: '#1565c0' },
                },
                '&:hover': { bgcolor: '#e3f2fd' },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    window.location.pathname === item.path ? '#fff' : '#1a3c34',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color:
                    window.location.pathname === item.path ? '#fff' : '#1a3c34',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </motion.div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: 260 }, flexShrink: { sm: 0 }, bgcolor: '#f5f7fa' }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 260,
            bgcolor: '#f5f7fa',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 260,
            bgcolor: '#f5f7fa',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
