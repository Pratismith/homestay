const express = require('express');
const Homestay = require('../models/Homestay');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// Add demo data - for development only
router.post('/seed', async (req, res) => {
  // Restrict to development environment only
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ msg: 'Demo seeding is disabled in production' });
  }
  
  try {
    // Check if demo owner exists
    let demoOwner = await User.findOne({ email: 'demo.owner@mynest.com' });
    
    if (!demoOwner) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('demo123', salt);
      
      demoOwner = await User.create({
        name: 'Demo Owner',
        email: 'demo.owner@mynest.com',
        passwordHash,
        role: 'owner'
      });
    }
    
    // Check if demo data already exists
    const existingCount = await Homestay.countDocuments();
    if (existingCount > 0) {
      return res.json({ msg: 'Demo data already exists', count: existingCount });
    }
    
    // Create demo homestays
    const demoHomestays = [
      {
        owner: demoOwner._id,
        title: 'Cozy Beach House in Goa',
        location: 'Calangute, Goa',
        pricePerNight: 2500,
        description: 'Beautiful beach house with stunning ocean views. Perfect for families and groups.',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'tv'],
        availableRooms: 3,
        instructions: 'Check-in after 2 PM. Beach access available.',
        images: []
      },
      {
        owner: demoOwner._id,
        title: 'Mountain Retreat in Manali',
        location: 'Old Manali, Himachal Pradesh',
        pricePerNight: 1800,
        description: 'Peaceful mountain homestay with breathtaking Himalayan views.',
        amenities: ['wifi', 'kitchen', 'parking'],
        availableRooms: 2,
        instructions: 'Best visited during summer months.',
        images: []
      },
      {
        owner: demoOwner._id,
        title: 'Heritage Home in Jaipur',
        location: 'Pink City, Jaipur',
        pricePerNight: 2000,
        description: 'Traditional Rajasthani homestay with authentic cultural experience.',
        amenities: ['ac', 'wifi', 'laundry'],
        availableRooms: 4,
        instructions: 'Traditional Rajasthani meals available on request.',
        images: []
      },
      {
        owner: demoOwner._id,
        title: 'Lake View Villa in Udaipur',
        location: 'Fateh Sagar Lake, Udaipur',
        pricePerNight: 3500,
        description: 'Luxurious villa with panoramic lake views and modern amenities.',
        amenities: ['wifi', 'ac', 'kitchen', 'parking', 'tv', 'laundry'],
        availableRooms: 5,
        instructions: 'Boat rides can be arranged. Call before arrival.',
        images: []
      },
      {
        owner: demoOwner._id,
        title: 'City Center Apartment in Mumbai',
        location: 'Bandra West, Mumbai',
        pricePerNight: 3000,
        description: 'Modern apartment in the heart of Mumbai. Close to restaurants and shopping.',
        amenities: ['wifi', 'ac', 'parking', 'tv'],
        availableRooms: 2,
        instructions: 'Metro station within walking distance.',
        images: []
      },
      {
        owner: demoOwner._id,
        title: 'Garden Homestay in Bangalore',
        location: 'Whitefield, Bangalore',
        pricePerNight: 1500,
        description: 'Quiet homestay with beautiful garden. Ideal for digital nomads.',
        amenities: ['wifi', 'kitchen', 'parking'],
        availableRooms: 3,
        instructions: 'Co-working space nearby.',
        images: []
      }
    ];
    
    const created = await Homestay.insertMany(demoHomestays);
    
    res.json({ 
      msg: 'Demo data created successfully!', 
      count: created.length,
      demoOwner: {
        email: 'demo.owner@mynest.com',
        password: 'demo123'
      }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating demo data', error: e.message });
  }
});

module.exports = router;
