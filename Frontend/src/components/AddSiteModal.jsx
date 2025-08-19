import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { addSite } from '../services/api';
import { toast } from 'react-toastify';

function AddSiteModal({ open, onClose, onSiteAdded }) {
  const [siteName, setSiteName] = useState('');

  const handleSubmit = async () => {
    if (!siteName.trim()) {
      toast.error('Site name is required');
      return;
    }
    try {
      const response = await addSite({ name: siteName });
      setSiteName('');
      onSiteAdded(response.data);
      onClose();
      toast.success('Site added successfully');
    } catch (error) {
      toast.error('Failed to add site');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DialogTitle>Add Construction Site</DialogTitle>
      <DialogContent>
        <TextField
          label="Site Name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          fullWidth
          margin="normal"
          required
          variant="outlined"
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: '8px',
            color: '#1a3c34',
            '&:hover': { bgcolor: '#e0e0e0' },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: '8px',
            bgcolor: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSiteModal;
