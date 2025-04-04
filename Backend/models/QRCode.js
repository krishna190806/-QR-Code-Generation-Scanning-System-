const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String
  },
  scanCount: {
    type: Number,
    default: 0
  },
  lastScannedAt: {
    type: Date
  }
});

const QRCode = mongoose.model('QRCode', qrCodeSchema);

module.exports = QRCode;
