const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (dummy credentials)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chessglossary';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Term Schema
const termSchema = new mongoose.Schema({
  term: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  examples: [String],
  createdAt: { type: Date, default: Date.now }
});

const Term = mongoose.model('Term', termSchema);

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