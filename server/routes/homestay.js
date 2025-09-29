const express = require('express');
const Homestay = require('../models/Homestay');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Add homestay (owner only)
router.post('/',
  auth('owner'),
  upload.array('images', 6),
  async (req,res) => {
    try {
      const { title, location, pricePerNight, description, amenities, instructions } = req.body;
      const images = (req.files||[]).map(f => `/uploads/${f.filename}`);
      const amenitiesArr = amenities ? JSON.parse(amenities) : [];
      const homestay = await Homestay.create({
        owner: req.user._id, title, location, pricePerNight, images,
        description, amenities: amenitiesArr, instructions
      });
      res.json(homestay);
    } catch (e) { console.error(e); res.status(500).send('Server error'); }
  });

// Search + filters + pagination
router.get('/search', async (req,res) => {
  try {
    const { q, minPrice, maxPrice, amenities, page=1, limit=12 } = req.query;
    const filter = {};
    if (q) filter.$or = [{ title: new RegExp(q,'i') }, { location: new RegExp(q,'i') }, { description: new RegExp(q,'i') }];
    if (minPrice) filter.pricePerNight = { ...filter.pricePerNight, $gte: Number(minPrice) };
    if (maxPrice) filter.pricePerNight = { ...filter.pricePerNight, $lte: Number(maxPrice) };
    if (amenities) {
      const arr = amenities.split(',');
      filter.amenities = { $all: arr };
    }
    const results = await Homestay.find(filter).skip((page-1)*limit).limit(Number(limit));
    res.json(results);
  } catch (e) { console.error(e); res.status(500).send('Server error'); }
});

// Get homestay by id
router.get('/:id', async (req,res) => {
  const homestay = await Homestay.findById(req.params.id).populate('owner','name email');
  if (!homestay) return res.status(404).json({ msg: 'Not found' });
  res.json(homestay);
});

module.exports = router;
