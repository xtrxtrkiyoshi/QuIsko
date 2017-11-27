const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, defualt: '' },
  difficulty: { type: String, default: '' },
  category: { type: String, default: '' },
  type: { type: String, default: '' },
  answer: { type: String, default: '' },
  found: {type: Boolean, default: false }
});

const CategorySchema = new Schema({
  name: { type: String, default: '' }
});

const DifficultySchema = new Schema({
  score: { type: Number }
});

const HighScoresSchema = new Schema({
  name: { type: String, defualt: '' },
  score: { type: Number },
  categories: { type: Array, default: [] }
});

mongoose.model('Question', QuestionSchema);
mongoose.model('Category', CategorySchema);
mongoose.model('Difficulty', DifficultySchema);
mongoose.model('HighScore', HighScoresSchema);