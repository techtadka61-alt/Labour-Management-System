import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
} from '@mui/material';
import { getLaboursBySite, searchLabours } from '../services/api';
import { toast } from 'react-toastify';

function ShowLabourTable({ siteId }) {
  const [labours, setLabours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLabours = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await searchLabours(siteId, searchQuery);
        } else {
          response = await getLaboursBySite(siteId);
        }
        setLabours(response.data);
      } catch (error) {
        toast.error('Failed to fetch labours');
      }
    };
    fetchLabours();
  }, [siteId, searchQuery]);

  return (
    <Box>
      <TextField
        label="Search Labour"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        margin="normal"
        sx={{ mb: 3 }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Father's Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labours.map((labour) => (
            <TableRow key={labour._id}>
              <TableCell>{labour.name}</TableCell>
              <TableCell>{labour.fatherName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default ShowLabourTable;
