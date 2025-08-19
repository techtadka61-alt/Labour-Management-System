import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { addLabour } from '../services/api';
import { toast } from 'react-toastify';

function LabourModal({ open, onClose, siteId, onLabourAdded }) {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !fatherName.trim()) {
      toast.error('All fields are required');
      return;
    }
    try {
      await addLabour({ siteId, name, fatherName });
      setName('');
      setFatherName('');
      onLabourAdded();
      onClose();
      toast.success('Labour added successfully');
    } catch (error) {
      toast.error('Failed to add labour');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Labour</DialogTitle>
      <DialogContent>
        <TextField
          label="Labour Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Father's Name"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LabourModal;
