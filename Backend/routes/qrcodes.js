const express = require('express');
const QRCode = require('../models/QRCode');
const auth = require('../middleware/auth');
const router = express.Router();
const qrcode = require('qrcode');
const nodemailer = require('nodemailer');

// Generate QR Code
router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    
    // Generate QR code image
    const qrCodeDataUrl = await qrcode.toDataURL(text);
    
    // Create QR code record
    const qrCode = new QRCode({
      text,
      userId: req.userId,
      imageUrl: qrCodeDataUrl
    });
    
    await qrCode.save();
    
    res.status(201).json(qrCode);
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR code', error: error.message });
  }
});

// Get all QR codes with pagination and filtering
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, startDate, endDate } = req.query;
    
    const query = { userId: req.userId };
    
    // Add date range filter if provided
    if (startDate && endDate) {
      query.generatedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const qrCodes = await QRCode.find(query)
      .sort({ generatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await QRCode.countDocuments(query);
    
    res.json({
      qrCodes,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching QR codes', error: error.message });
  }
});

// Delete QR code
router.delete('/:id', auth, async (req, res) => {
  try {
    const qrCode = await QRCode.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    
    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }
    
    res.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting QR code', error: error.message });
  }
});

// Share QR code via email
router.post('/share', auth, async (req, res) => {
  try {
    const { qrCodeId, recipientEmail } = req.body;
    
    const qrCode = await QRCode.findOne({
      _id: qrCodeId,
      userId: req.userId
    });
    
    if (!qrCode) {
      return res.status(404).json({ message: 'QR code not found' });
    }
    
    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Shared QR Code',
      html: `
        <h2>QR Code Shared with You</h2>
        <p>Here is the QR code that was shared with you:</p>
        <img src="${qrCode.imageUrl}" alt="QR Code" />
        <p>Text content: ${qrCode.text}</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.json({ message: 'QR code shared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sharing QR code', error: error.message });
  }
});

module.exports = router;
