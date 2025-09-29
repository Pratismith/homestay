const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ msg: 'No token' });
      const token = header.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.id);
      if (!user) return res.status(401).json({ msg: 'Invalid token' });
      if (requiredRole && user.role !== requiredRole) return res.status(403).json({ msg: 'Forbidden' });
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ msg: 'Unauthorized' });
    }
  };
};

module.exports = auth;
