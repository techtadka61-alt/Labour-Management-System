import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  getLaboursBySite,
  searchLabours,
  saveAttendance,
  checkAttendanceExists,
} from '../services/api';
import { toast } from 'react-toastify';

function AttendanceTable({ siteId }) {
  const [labours, setLabours] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isAttendanceSaved, setIsAttendanceSaved] = useState(false);

  useEffect(() => {
    const fetchLaboursAndCheckAttendance = async () => {
      if (!siteId) {
        toast.error('Please select a site');
        return;
      }
      try {
        const currentDate = new Date().toISOString().split('T')[0]; // "2025-05-26"
        const [labourResponse, attendanceExists] = await Promise.all([
          getLaboursBySite(siteId),
          checkAttendanceExists(siteId, currentDate),
        ]);

        setLabours(labourResponse.data);
        setIsAttendanceSaved(attendanceExists);

        const initialAttendance = {};
        labourResponse.data.forEach((labour) => {
          initialAttendance[labour._id] = {
            labourId: labour._id,
            present: false,
          };
        });
        setAttendance(initialAttendance);
      } catch (error) {
        toast.error('Failed to fetch labours or check attendance');
      }
    };
    fetchLaboursAndCheckAttendance();
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

  const handleAttendanceChange = (labourId) => {
    setAttendance((prev) => ({
      ...prev,
      [labourId]: { ...prev[labourId], present: !prev[labourId]?.present },
    }));
  };

  const handleSubmit = async () => {
    if (isAttendanceSaved) {
      toast.warn('Attendance for today has already been saved');
      return;
    }

    if (!siteId) {
      toast.error('Site ID is required');
      return;
    }

    const attendanceData = Object.entries(attendance).map(
      ([labourId, data]) => ({
        labourId,
        present: data.present,
      })
    );

    if (attendanceData.length === 0) {
      toast.error('No attendance data to save');
      return;
    }

    const payload = {
      siteId,
      date: new Date().toISOString().split('T')[0], // "2025-05-26"
      attendance: attendanceData,
    };

    try {
      await saveAttendance(payload);
      setIsAttendanceSaved(true);
      toast.success('Attendance saved successfully');
    } catch (error) {
      console.error('Save Attendance Error:', error.response?.data);
      toast.error(
        error.response?.data?.message ||
          'Failed to save attendance. Check the payload format.'
      );
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f5f7fa' }}>
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
      {isAttendanceSaved && (
        <Typography color="warning.main" sx={{ mb: 2 }}>
          Attendance for today has already been saved.
        </Typography>
      )}
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
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a3c34' }}>
                Father's Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#1a3c34' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labours.length > 0 ? (
              labours.map((labour) => (
                <TableRow key={labour._id}>
                  <TableCell>{labour.name}</TableCell>
                  <TableCell>{labour.fatherName}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={attendance[labour._id]?.present || false}
                      onChange={() => handleAttendanceChange(labour._id)}
                      disabled={isAttendanceSaved}
                    />
                    <Chip
                      label={
                        attendance[labour._id]?.present ? 'Present' : 'Absent'
                      }
                      color={
                        attendance[labour._id]?.present ? 'success' : 'error'
                      }
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <Typography color="text.secondary" align="center">
                    No labours found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isAttendanceSaved}
          sx={{
            borderRadius: '8px',
            px: 4,
            py: 1,
            bgcolor: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
            },
            '&:disabled': { bgcolor: '#b0bec5' },
          }}
        >
          Save Attendance
        </Button>
      </Box>
    </Box>
  );
}

export default AttendanceTable;
