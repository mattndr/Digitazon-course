import mongoose from 'mongoose';

export const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  module: String,
  rank: { type: Number, required: true, min: 1 },
  description: String,
  linksToRecorderLessons: [String],
  completionDate: Date,
});
