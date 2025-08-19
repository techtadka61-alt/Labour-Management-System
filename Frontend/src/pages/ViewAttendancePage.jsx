import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ViewAttendanceTable from '../components/ViewAttendanceTable';

function ViewAttendancePage({ siteId, siteName }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
          View Attendance - {siteName}
        </Typography>
        <ViewAttendanceTable siteId={siteId} />
      </Box>
    </motion.div>
  );
}

export default ViewAttendancePage;
