import mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  linksToRecorderLessons: { type: String, default: '' },
  completionDate: Date,
});
