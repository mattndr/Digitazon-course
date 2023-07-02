import mongoose from 'mongoose';

// every SCHEMA maps to a mongoDB COLLECTION and define the shape of the documents within that collection
const buyerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
