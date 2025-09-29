const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // bcrypt
  role: { type: String, enum: ['client','owner'], required: true },
  aadhaarHash: { type: String }, // optional: store only hashed value
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
