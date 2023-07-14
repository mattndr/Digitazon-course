import { todoSchema } from '../todos/todo.schema';
import mongoose from 'mongoose';

export const courseSchema = new mongoose.Schema({
  seller: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
  },
  creationDatetime: {
    type: Date,
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  presentationVideoUrl: String,
  imageUrl: String,
  price: { type: Number, min: 0 },
  publicationDatetime: { type: Date || null, default: null },
  startingDatetime: { type: Date || null, default: null },
  endingDatetime: { type: Date || null, default: null },
  minimumEnrollments: { type: Number, min: 0 },
  todos: [todoSchema],
  enrolledUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  deleted: { type: Boolean, default: false },
});

export const Course = mongoose.model('Course', courseSchema);
