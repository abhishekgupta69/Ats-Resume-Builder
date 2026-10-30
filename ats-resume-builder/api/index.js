const connectDB = require('../server/config/db');
const app = require('../server/app');

module.exports = async (req, res) => {
  try {
    // Wait for the database to connect BEFORE processing the request
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Vercel API Error:', error);
    return res.status(500).json({ error: 'Database connection failed' });
  }
};