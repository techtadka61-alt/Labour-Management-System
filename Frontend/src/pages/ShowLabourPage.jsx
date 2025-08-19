import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  Button,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { getLaboursBySite, searchLabours } from '../services/api';
import { toast } from 'react-toastify';

function ShowLabourPage({ siteId }) {
  const [labours, setLabours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLabours = async () => {
      try {
        const response = await getLaboursBySite(siteId);
        setLabours(response.data);
      } catch (error) {
        toast.error('Failed to fetch labours');
      }
    };
    fetchLabours();
  }, [siteId]);

  const handleSearch = async () => {
    try {
      const response = searchQuery.trim()
        ? await searchLabours(siteId, searchQuery)
        : await getLaboursBySite(siteId);
      setLabours(response.data);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f5f7fa' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: '#1a3c34',
          mb: 4,
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        Labour List
      </Typography>
      <Box sx={{ display: 'flex', mb: 3, maxWidth: 400 }}>
        <TextField
          label="Search Labours"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': { borderColor: '#bbdefb' },
              '&:hover fieldset': { borderColor: '#1976d2' },
              '&.Mui-focused fieldset': { borderColor: '#1976d2' },
            },
            '& .MuiInputLabel-root': { color: '#1a3c34' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            ml: 1,
            borderRadius: '8px',
            px: 3,
            bgcolor: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
            },
          }}
        >
          Search
        </Button>
      </Box>
      <TableContainer
        sx={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          background: '#fff',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Father's Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labours.length > 0 ? (
              labours.map((labour) => (
                <TableRow key={labour._id}>
                  <TableCell>{labour.name}</TableCell>
                  <TableCell>{labour.fatherName}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>No labours found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ShowLabourPage;
