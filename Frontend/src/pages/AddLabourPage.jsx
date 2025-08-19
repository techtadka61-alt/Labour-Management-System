import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { addLabour } from '../services/api';
import { toast } from 'react-toastify';

function AddLabour({ siteId, siteName }) {
  const [formData, setFormData] = useState({ name: '', fatherName: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father's Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await addLabour({ siteId, ...formData });
      toast.success('Labour added successfully');
      setFormData({ name: '', fatherName: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add labour');
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1a3c34',
            fontSize: { xs: '1.5rem', md: '2rem' },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <PersonAdd sx={{ color: '#1976d2' }} />
          Add Labour - {siteName}
        </Typography>
      </Box>
      <Paper
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: { xs: 2, md: 3 },
          borderRadius: '16px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Father's Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.fatherName}
                helperText={errors.fatherName}
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
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2, borderColor: '#e0e0e0' }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  bgcolor: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
                  },
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Save Labour
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default AddLabour;
