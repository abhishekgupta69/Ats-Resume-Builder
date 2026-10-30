// ── Vercel serverless function entry ──
// Vercel turns every file under /api into a serverless function.
// vercel.json rewrites /api/* requests here; this file simply exposes
// the Express app (the original request path is preserved, so the
// /api/auth, /api/resumes and /api/ats routes all work unchanged).
module.exports = require('../server/app');
