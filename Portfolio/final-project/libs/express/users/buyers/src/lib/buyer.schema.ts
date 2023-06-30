import mongoose from 'mongoose';

// every SCHEMA maps to a mongoDB COLLECTION and define the shape of the documents within that collection
const buyerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // phoneNumber: { type: String, required: true },
  // fullName: {
  //   firstName: { type: String, required: true },
  //   lastName: { type: String, required: true },
  // },
  // birthDate: { type: Date, required: true },
  // address: {
  //   streetAddress: { type: String, required: true },
  //   zip: { type: Number, required: true },
  //   town: { type: String, required: true },
  //   country: { type: String, required: true },
  // },
  enrollments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Enrollment',
  },
});

// To use our schema definition, we need to convert our Schema into a Model
// we can work with. To do so, we pass it into mongoose.model(modelName, schema)
// A model is a class with which we construct documents.
export const Buyer = mongoose.model('Buyer', buyerSchema);
// ready to go!
