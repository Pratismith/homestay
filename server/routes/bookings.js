const express = require('express');
const Booking = require('../models/Booking');
const Homestay = require('../models/Homestay');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

const router = express.Router();

// helper: check overlap
function isOverlap(startA, endA, startB, endB) {
  return (startA <= endB) && (startB <= endA);
}

// Book a homestay (client only)
router.post('/',
  auth('client'),
  async (req,res) => {
    try {
      const { homestayId, startDate, endDate, aadhaar } = req.body;
      const hs = await Homestay.findById(homestayId);
      if (!hs) return res.status(404).json({ msg: 'Homestay not found' });
      const s = new Date(startDate), e = new Date(endDate);
      if (s >= e) return res.status(400).json({ msg: 'Invalid date range' });

      // Check bookings for overlaps
      const existing = await Booking.find({ homestay: homestayId, status: 'confirmed' });
      for (let b of existing) {
        if (isOverlap(s,e,new Date(b.startDate), new Date(b.endDate))) {
          return res.status(400).json({ msg: 'Dates not available' });
        }
      }

      // compute price (simple)
      const nights = Math.ceil((e - s) / (1000*60*60*24));
      const totalPrice = nights * hs.pricePerNight;

      // Hash aadhaar if provided (do NOT store plain)
      let aadhaarHash;
      if (aadhaar) {
        const salt = await bcrypt.genSalt(10);
        aadhaarHash = await bcrypt.hash(aadhaar, salt);
      }

      const booking = await Booking.create({
        homestay: homestayId,
        client: req.user._id,
        startDate: s,
        endDate: e,
        totalPrice,
        aadhaarHash
      });

      res.json({ booking, message: 'Booking confirmed' });
    } catch (e) { console.error(e); res.status(500).send('Server error'); }
  });

// Get bookings for user (client) or owner (their homestays)
router.get('/', auth(), async (req,res) => {
  try {
    if (req.user.role === 'client') {
      const bookings = await Booking.find({ client: req.user._id }).populate('homestay');
      return res.json(bookings);
    } else {
      // owner: bookings for homestays belonging to owner
      const Homestay = require('../models/Homestay');
      const myHs = await Homestay.find({ owner: req.user._id });
      const ids = myHs.map(h=>h._id);
      const bookings = await Booking.find({ homestay: { $in: ids } }).populate('client').populate('homestay');
      return res.json(bookings);
    }
  } catch (e) { console.error(e); res.status(500).send('Server error'); }
});

module.exports = router;
