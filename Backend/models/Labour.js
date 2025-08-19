const mongoose = require('mongoose');

const labourSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Site',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Labour', labourSchema);
