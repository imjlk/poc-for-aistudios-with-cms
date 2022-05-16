import mongoose from 'mongoose';

const TTVSchema = new mongoose.Schema({
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
  isCompleted: {
    type: Boolean,
  },
  videoUrl: {
    type: String,
    validate: (url) => {
      return /(http | https): \/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?mp4$/.test(
        url
      );
    },
  },
  modifiedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.TTV || mongoose.model('TTV', TTVSchema);
