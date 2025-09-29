# MyNest - Homestay Booking Application

## Overview
MyNest is a full-stack homestay booking application that allows users to search for homestays, register as guests or owners, and manage bookings.

**Status**: Application is configured and running in Replit environment
**Last Updated**: September 29, 2025

## Project Architecture

### Technology Stack
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Authentication**: JWT-based auth
- **File Upload**: Multer middleware

### Project Structure
```
├── client/                 # Frontend static files
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── *.html             # HTML pages
└── server/                # Backend application
    ├── config/            # Database configuration
    ├── middleware/        # Auth & upload middleware
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── uploads/           # User uploaded files
    └── server.js          # Main server file
```

### Key Features
- User authentication (Guest/Owner roles)
- Homestay search with filters (price, amenities, location)
- Image upload for listings
- Booking management
- Owner dashboard

## Recent Changes

### September 29, 2025 - Feature Enhancements & Improvements
- ✅ Fixed registration and login system with role selection (Guest/Owner)
- ✅ Created comprehensive owner dashboard with property management
- ✅ Simplified homepage search to location-based with filter panel
- ✅ Enhanced listing details page with amenities showcase
- ✅ Added demo data seeding functionality (6 sample homestays)
- ✅ Improved UI/UX with better styling and responsive design
- ✅ Added availability tracking with room count management

### September 29, 2025 - Initial Replit Setup
- ✅ Installed Node.js 20 and project dependencies
- ✅ Fixed multer version incompatibility (1.4.5 → 1.4.5-lts.1)
- ✅ Created missing CSS stylesheet for frontend
- ✅ Fixed route import (homestays → homestay)
- ✅ Configured server to bind to 0.0.0.0:5000 for Replit environment
- ✅ Made database connection resilient (non-fatal error handling)
- ✅ Set up workflow for automatic server startup
- ✅ Created .gitignore for Node.js project
- ✅ Configured deployment settings for autoscale

## Important Notes

### Database Configuration
✅ **MongoDB Atlas**: The application is connected to MongoDB Atlas. The database is configured and working properly.

**Demo Data**:
- Visit `/demo.html` to populate the database with 6 sample homestays
- Demo owner account will be created: `demo.owner@mynest.com` / `demo123`
- Demo seeding is restricted to development environment only for security

### Environment Variables
The following environment variables are configured in `server/.env`:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 5000)

### Deployment
- **Type**: Autoscale (stateless web application)
- **Port**: 5000
- **Command**: `cd server && npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Homestays
- `GET /api/homestays/search` - Search homestays with filters
- `GET /api/homestays/:id` - Get homestay details
- `POST /api/homestays` - Add new homestay (owner only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
