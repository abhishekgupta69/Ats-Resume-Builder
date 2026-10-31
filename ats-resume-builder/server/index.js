const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const connectDB = require('./config/db');
const app = require('./app'); // ⚠️ 'app' MUST be defined here first!

// ==========================================
// ✅ HEALTH CHECK ROUTES (Put them HERE, after 'app' is defined)
// ==========================================
app.get('/', (req, res) => {
  res.json({ 
    message: 'ATS Resume Builder API is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});
// ==========================================

const startServer = async () => {
  try {
    // Wait for the database to connect BEFORE starting the local server
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();