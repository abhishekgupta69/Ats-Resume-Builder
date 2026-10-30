// ─ Bulletproof .env loader (works in monorepo + nodemon) ──
const fs = require('fs');
const path = require('path');

// Go up TWO levels: server/ → ats-resume-builder/ → ats-resume-builder/ (root)
const envPath = path.resolve(__dirname, '..', '..', '.env');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex !== -1) {
        const key = trimmed.substring(0, eqIndex).trim();
        const value = trimmed.substring(eqIndex + 1).trim();
        process.env[key] = value;
      }
    }
  });
  console.log('[ENV] .env loaded from:', envPath);
} catch (err) {
  console.error('[ENV] Failed to load .env:', err.message);
}

// Debug check
console.log('[ENV] MONGO_URI set:', !!process.env.MONGO_URI);
console.log('[ENV] JWT_SECRET set:', !!process.env.JWT_SECRET);

// ── Rest of your original code ─
const express = require('express');
const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));