const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');
const labourRoutes = require('./routes/labourRoutes');
const siteRoutes = require('./routes/siteRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

dotenv.config();
connectDB();

const app = express();

// Explicit CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use('/api/labours', labourRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for Vercel serverless
module.exports = app;
