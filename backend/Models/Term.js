const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    unique: true,
  },
  definition: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  examples: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Term = mongoose.model('Term', termSchema);

module.exports = Term;