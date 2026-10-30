// ── Vercel serverless function entry ──
// Vercel turns every file under /api into a serverless function.
// vercel.json rewrites /api/* requests here; this file simply exposes
// the Express app (the original request path is preserved, so the
// /api/auth, /api/resumes and /api/ats routes all work unchanged).

const connectDB = require('../server/config/db');
const app = require('../server/app');

module.exports = async (req, res) => {
  try {
    // ✅ Await DB connection BEFORE handling any request
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Vercel DB Connection Error:', error);
    return res.status(500).json({ 
      error: 'Database connection failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};