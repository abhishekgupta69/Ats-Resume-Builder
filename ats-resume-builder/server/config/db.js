const mongoose = require('mongoose');

// ── Serverless-safe connection cache ──
// Vercel serverless functions are stateless: each cold start would otherwise
// create a NEW MongoDB connection. Caching on `global` reuses the connection
// across invocations in the same lambda instance.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set('bufferCommands', false); // fail fast instead of buffering on cold start
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000, // stay within Vercel's function time budget
    });
  }

  try {
    cached.conn = await cached.promise;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`MongoDB connected: ${cached.conn.connection.host}`);
    }
  } catch (error) {
    cached.promise = null; // allow retry on next invocation
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;
