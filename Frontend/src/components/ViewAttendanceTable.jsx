import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  ButtonGroup,
  Button,
  Chip,
  Typography,
} from '@mui/material';
import { getAttendanceBySite } from '../services/api';
import { toast } from 'react-toastify';

function ViewAttendanceTable({ siteId }) {
  const [attendance, setAttendance] = useState([]);
  const [period, setPeriod] = useState('daily');

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!siteId) {
        toast.error('Please select a site');
        setAttendance([]);
        return;
      }
      try {
        const response = await getAttendanceBySite(siteId, period);
        console.log('Processed Attendance Data:', response.data);
        setAttendance(response.data || []);
      } catch (error) {
        console.error(
          'Fetch Attendance Error:',
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message ||
            'Failed to fetch attendance. Ensure the backend is running.'
        );
        setAttendance([]);
      }
    };
    fetchAttendance();
  }, [siteId, period]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f5f7fa' }}>
      <ButtonGroup sx={{ mb: 3 }}>
        <Button
          variant={period === 'daily' ? 'contained' : 'outlined'}
          onClick={() => setPeriod('daily')}
          sx={{
            borderRadius: '8px',
            bgcolor:
              period === 'daily'
                ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                : '',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
            },
            color: period === 'daily' ? '#fff' : '#1a3c34',
          }}
        >
          Daily
        </Button>
        <Button
          variant={period === 'weekly' ? 'contained' : 'outlined'}
          onClick={() => setPeriod('weekly')}
          sx={{
            borderRadius: '8px',
            bgcolor:
              period === 'weekly'
                ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                : '',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
            },
            color: period === 'weekly' ? '#fff' : '#1a3c34',
          }}
        >
          Weekly
        </Button>
        <Button
          variant={period === 'monthly' ? 'contained' : 'outlined'}
          onClick={() => setPeriod('monthly')}
          sx={{
            borderRadius: '8px',
            bgcolor:
              period === 'monthly'
                ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
                : '',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
            },
            color: period === 'monthly' ? '#fff' : '#1a3c34',
          }}
        >
          Monthly
        </Button>
      </ButtonGroup>
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
              <TableCell sx={{ fontWeight: 600, color: '#1a3c34' }}>
                Labour Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a3c34' }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a3c34' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.length > 0 ? (
              attendance.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.labourId?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    {new Date(record.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.present ? 'Present' : 'Absent'}
                      color={record.present ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography color="text.secondary" align="center">
                    No attendance records found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewAttendanceTable;
