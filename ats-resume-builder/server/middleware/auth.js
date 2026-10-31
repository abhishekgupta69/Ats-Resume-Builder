const jwt = require('jsonwebtoken');

// Protect routes — verifies JWT and attaches user id to req.user
module.exports = function (req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired' });
  }
};