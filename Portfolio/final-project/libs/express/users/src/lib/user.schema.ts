import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  registrationDate: { type: Date, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  birthDate: { type: Date, required: true },
  address: {
    streetAddress: { type: String, required: true },
    // zip: { type: Number, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
  },
  isSeller: { type: Boolean, default: false },
  sellerVerification: {
    id: { type: String, unique: true, sparse: true },
    status: {
      type: String,
      enum: ['accepted', 'refused', 'pending'],
    },
    sumbmissionDate: Date,
  },
  sellerProfile: {
    description: String,
    presentationVideoUrl: String,
  },
});

export const User = mongoose.model('User', userSchema);
