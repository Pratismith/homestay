// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.warn('⚠️  Server will continue without database. API endpoints will not work until MongoDB is connected.');
  }
};

module.exports = connectDB;
