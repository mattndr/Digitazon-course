import mongoose from 'mongoose';

export const enrollmentSchema = new mongoose.Schema({
  stripePaymentId: { type: String, required: true, unique: true },
  datetime: { type: Date, required: true },
  certificateOfCompletion: String,
  percentageOfFrequency: { type: Number, min: 0, max: 100 },
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
