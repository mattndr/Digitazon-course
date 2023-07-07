import mongoose from 'mongoose';

// every SCHEMA maps to a mongoDB COLLECTION and define the shape of the documents within that collection
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
  enrollments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Enrollment',
  },
  isSeller: { type: Boolean, default: false },
  seller_verification: {
    id: { type: String, unique: true, sparse: true },
    status: {
      type: String,
      enum: ['accepted', 'refused', 'pending'],
    },
    sumbmissionDate: Date,
  },
  seller_profile: {
    description: String,
    presentationVideoUrl: String,
  },
  // seller_courses: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Course',
  // },
});

// To use our schema definition, we need to convert our Schema into a Model
// we can work with. To do so, we pass it into mongoose.model(modelName, schema)
// A model is a class with which we construct documents.
export const User = mongoose.model('User', userSchema);
