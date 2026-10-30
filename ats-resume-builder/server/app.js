require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resumes', require('./routes/resume'));
app.use('/api/ats', require('./routes/ats'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// Central error handler
app.use(errorHandler);

module.exports = app;