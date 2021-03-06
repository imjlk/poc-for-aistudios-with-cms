import mongoose from 'mongoose';

var TTVSchema = new mongoose.Schema({
  targetPostId: {
    type: Array,
  },
  language: {
    type: String,
    required: [true, 'Language is required!'],
    trim: true,
  },
  model: {
    type: String,
    required: [true, 'Model is required!'],
    trim: true,
  },
  clothes: {
    type: String,
    required: [true, 'Clothes is required!'],
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Text is required!'],
    trim: true,
  },
  videoUrl: {
    type: String,
  },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('TTV', TTVSchema) ||
  mongoose.model('TTV', TTVSchema);
