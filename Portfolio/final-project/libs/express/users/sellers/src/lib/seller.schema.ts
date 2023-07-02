import mongoose from 'mongoose';

// every SCHEMA maps to a mongoDB COLLECTION and define the shape of the documents within that collection
const sellerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verification: {
    id: { type: String, unique: true, sparse: true },
    status: {
      type: String,
      enum: ['accepted', 'refused', 'pending'],
    },
    sumbmissionDate: Date,
  },
  profile: {
    description: String,
    presentationVideoUrl: String,
  },
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Course',
    // validate: {
    //   // The actual validator function goes here.
    //   // "arr" will be the value that's being validated (so an array of
    //   // mongoose new ObjectId statements, in this case).
    //   validator: (arr) => {
    //     // Convert all of the items in the array "arr", to their string
    //     // representations.
    //     // Then, use those strings to create a Set (which only stores unique
    //     // values).
    //     const s = new Set(arr.map(String));
    //     // Compare the Set and Array's sizes, to see if there were any
    //     // duplicates. If they're not equal, there was a duplicate, and
    //     // validation will fail.
    //     return s.size === arr.length;
    //   },
    //   // Provide a more meaningful error message.
    //   message: (p) =>
    //     `The values provided for '${p.path}', ` +
    //     `[${p.value}], contains duplicates.`,
    // },
  },
});

// sellerSchema.index(
//   {
//     email: 1,
//     'courses.$.creationDatetime': 1,
//   },
//   { unique: true }
// );

// sellerSchema.index({
//   email: 1,
//   'courses.creationDatetime': 1,
// 'courses.todos.rank': 1,
// }, { unique: true });

// To use our schema definition, we need to convert our Schema into a Model
// we can work with. To do so, we pass it into mongoose.model(modelName, schema)
// A model is a class with which we construct documents.
export const Seller = mongoose.model('Seller', sellerSchema);
// ready to go!
