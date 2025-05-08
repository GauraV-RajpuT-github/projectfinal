require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes   = require('./routes/auth');
const notesRoutes  = require('./routes/notes');
const blogsRoutes  = require('./routes/blogs');
const geminiRoutes = require('./routes/gemini');

const app = express();

// CORS (as you already have it)
app.use(function(req, res, next) {
  res.header('Access‑Control‑Allow‑Origin',  '*');
  res.header('Access‑Control‑Allow‑Headers','Origin, X‑Requested‑With, Content‑Type, Accept');
  res.header('Access‑Control‑Allow‑Methods','GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(cors());
app.use(express.json());

// ── CHANGE #1: use the env var, fallback to mongo‑db service name ──
const mongoUri = process.env.MONGODB_URI
               || 'mongodb://mongo-db:27017/syntaxshiksha';

mongoose.connect(mongoUri, {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('🔥 MongoDB connection error:', err));

// Routes
app.use('/api/auth',   authRoutes);
app.use('/api/notes',  notesRoutes);
app.use('/api/blogs',  blogsRoutes);
app.use('/api/gemini', geminiRoutes);

// ── CHANGE #2: use PORT from .env (e.g. 5002 in Compose) ──
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
