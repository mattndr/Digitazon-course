import { todoSchema } from './todo.schema';
import mongoose from 'mongoose';

// every SCHEMA maps to a mongoDB COLLECTION and define the shape of the documents within that collection
export const courseSchema = new mongoose.Schema(
  {
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
    price: { type: Number, min: 0 },
    publicationDate: Date,
    startingDate: Date,
    endingDate: Date,
    minimumEnrollments: { type: Number, min: 0 },
    todos: [todoSchema], // there is no need to access those Todos on their own
    enrollments_id: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Enrollment',
    },
    deleted: { type: Boolean, default: false },
    // todos: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: 'Todo'
    // }
    // enrollments_id: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Enrollment',
    //   },
    // ],
  }
  // { _id: false }
);

// courseSchema.index(
//   {
//     seller_id: 1,
//     creationDatetime: 1,
//     title: 1
//   },
//   { unique: true }
// );

export const Course = mongoose.model('Course', courseSchema);
