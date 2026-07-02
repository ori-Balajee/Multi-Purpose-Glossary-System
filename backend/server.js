const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Term = require('./Models/Term');
require('dotenv').config();

// Route Groups
const authRoutes = require('./Routes/auth');
const aiRoute = require('./Routes/aiRoutes')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});

// Use Routes - BaseURL set
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoute);

// MongoDB Connection (dummy credentials)
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/terms', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    const terms = await Term.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, terms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/terms/:term', async (req, res) => {
  try {
    const term = await Term.findOne({ term: req.params.term });
    if (!term) {
      return res.status(404).json({ success: false, message: 'Term not found' });
    }
    res.json({ success: true, term });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/terms', async (req, res) => {
  try {
    const term = new Term(req.body);
    await term.save();
    res.status(201).json({ success: true, term });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Chess Glossary API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});