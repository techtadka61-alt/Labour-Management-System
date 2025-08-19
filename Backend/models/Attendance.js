const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    labourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Labour',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    present: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure unique attendance record per labourer, site, and date
attendanceSchema.index({ siteId: 1, labourId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
