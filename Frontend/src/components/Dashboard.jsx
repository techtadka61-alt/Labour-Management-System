import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Avatar,
} from '@mui/material';
import { Add, EventAvailable, People } from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getLaboursBySite, getAttendanceList } from '../services/api';
import { toast } from 'react-toastify';
import AddSiteModal from './AddSiteModal';

function Dashboard({ selectedSite, setSelectedSite }) {
  const [chartData, setChartData] = useState([]);
  const [totalLabours, setTotalLabours] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!selectedSite?._id) {
        setChartData([]);
        setTotalLabours(0);
        return;
      }
      try {
        const currentDate = new Date().toISOString().split('T')[0]; // "2025-05-26"
        const [laboursResponse, attendanceResponse] = await Promise.all([
          getLaboursBySite(selectedSite._id),
          getAttendanceList(selectedSite._id, currentDate),
        ]);

        // Process attendance data for pie chart
        const attendanceData = attendanceResponse.data || [];
        const presentCount = attendanceData.filter((a) => a.present).length;
        const absentCount = attendanceData.length - presentCount;
        setChartData([
          { name: 'Present', value: presentCount, color: '#4caf50' },
          { name: 'Absent', value: absentCount, color: '#f44336' },
        ]);

        // Set total labourers
        const labourData = laboursResponse.data || [];
        setTotalLabours(labourData.length);
      } catch (error) {
        console.error('Dashboard Fetch Error:', error);
        toast.error('Failed to fetch dashboard data');
        setChartData([]);
        setTotalLabours(0);
      }
    };
    fetchDashboardData();
  }, [selectedSite]);

  const handleSiteAdded = (newSite) => {
    setSelectedSite(newSite);
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1a3c34',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          Dashboard {selectedSite ? `- ${selectedSite.name}` : ''}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{
            bgcolor: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            color: '#fff',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
            },
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          Add Site
        </Button>
      </Box>

      {selectedSite ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: '16px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                overflow: 'hidden',
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#1a3c34' }}
                  >
                    Today's Attendance
                  </Typography>
                }
                avatar={
                  <Avatar sx={{ bgcolor: '#1976d2' }}>
                    <EventAvailable />
                  </Avatar>
                }
                sx={{ pb: 1 }}
              />
              <Divider sx={{ mx: 2, borderColor: '#e0e0e0' }} />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="80%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={80}
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={{ stroke: '#999', strokeWidth: 1 }}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          backgroundColor: '#fff',
                        }}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ py: 4 }}
                  >
                    No attendance data available for today.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                borderRadius: '16px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #ffffff 0%, #fce4ec 100%)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                overflow: 'hidden',
              }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: '#1a3c34' }}
                  >
                    Total Labourers
                  </Typography>
                }
                avatar={
                  <Avatar sx={{ bgcolor: '#dc004e' }}>
                    <People />
                  </Avatar>
                }
                sx={{ pb: 1 }}
              />
              <Divider sx={{ mx: 2, borderColor: '#e0e0e0' }} />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: '#dc004e',
                    fontSize: { xs: '2.5rem', sm: '3rem' },
                  }}
                >
                  {totalLabours}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 2, fontSize: { xs: '1.2rem', md: '1.5rem' } }}
          >
            Please select a site from the sidebar or add a new site.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenModal(true)}
            sx={{
              bgcolor: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              color: '#fff',
              '&:hover': {
                bgcolor: 'linear-gradient(45deg, #1565c0 30%, #2196f3 90%)',
              },
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              py: 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            Add New Site
          </Button>
        </Box>
      )}
      <AddSiteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSiteAdded={handleSiteAdded}
      />
    </Box>
  );
}

export default Dashboard;
