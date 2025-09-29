const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  homestay: { type: mongoose.Schema.Types.ObjectId, ref: 'Homestay', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  aadhaarHash: { type: String }, // hashed or masked token for verification if needed
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['confirmed','cancelled'], default: 'confirmed'}
});

module.exports = mongoose.model('Booking', BookingSchema);
