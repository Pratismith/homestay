const mongoose = require('mongoose');

const HomestaySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  images: [String], // URLs or file paths (e.g., /uploads/xxx.jpg)
  description: String,
  amenities: [String], // e.g., ['wifi','ac','kitchen']
  instructions: String, // owner inserted
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Homestay', HomestaySchema);
