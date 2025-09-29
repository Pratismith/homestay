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
⚠️ **MongoDB Atlas Connection Issue**: The application uses an external MongoDB Atlas database that requires IP whitelisting. Currently, the database connection fails because Replit's IP is not whitelisted.

**To fix this**:
1. Go to your MongoDB Atlas dashboard
2. Navigate to Network Access
3. Add Replit's IP address or use `0.0.0.0/0` (allow all IPs) for development
4. The server will continue to run and serve the frontend even without database connection
5. API endpoints will work once MongoDB is connected

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
