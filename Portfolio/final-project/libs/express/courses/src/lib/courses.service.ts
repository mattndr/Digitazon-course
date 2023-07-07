import mongoose from 'mongoose';
import { Course } from './course.schema';

export const create = async (body) => {
  try {
    const course = new Course(body);
    await course.save();
    return course._id;
  } catch (err) {
    console.log(`[${new Date().toISOString()}] ERROR\n`, err);
  }
};

export const readCourse = async (id, extraFieldsToSelect) => {
  try {
    return await Course.find(
      {
        id: new mongoose.Types.ObjectId(id),
        deleted: false,
        startingDate: null,
      },
      {
        seller: 1,
        title: 1,
        description: 1,
        presentationVideoUrl: 1,
        price: 1,
        ...extraFieldsToSelect,
      }
    )
      .where('publicationDate')
      .ne(null)
      .exec();
  } catch (err) {
    return;
  }
};

export const readCourses = async () => {
  try {
    return await Course.find(
      { deleted: false, startingDate: null },
      { seller: 1, title: 1, description: 1, presentationVideoUrl: 1, price: 1 }
    )
      .where('publicationDate')
      .ne(null)
      .exec();
  } catch (err) {
    return;
  }
};

// TO-TEST
//
//
//
//
export const readCoursesBySellerId = async (id) => {
  return await Course.find({ seller: { id }, deleted: false }).exec();
};

export const readActiveCoursesBySellerId = async (id) => {
  const courses = await Course.find({
    $and: [
      { seller_id: id },
      { deleted: { $eq: false } },
      { publicationDate: { $ne: null } },
      { startingDate: { $eq: null } },
    ],
  }).exec();
  return courses;
};

export const readCourseDetails = async (id, cid) => {
  try {
    return await Course.findOne({
      seller_id: id,
      _id: cid,
      deleted: false,
    }).exec();
  } catch (err) {
    return;
  }
};

export const updateCourse = async (cid, body) => {
  try {
    await Course.updateOne({ _id: cid, deleted: false }, body);
    return true;
  } catch (err) {
    console.log(err);
    return;
  }
};

// {
//   "email": "a@a.com",
//   "password": "Qwerty123@",
//   "registrationDate": "2023-07-03T14:37:02.557Z",
//   "phoneNumber": "3129339109",
//   "fullName": {
//      "firstName": "Nicola",
//      "lastName": "Rossi"
//   },
//   "birthDate": "2023-07-03T14:37:02.557Z",
//   "address": {
//      "streetAddress": "Via Roma 22",
//      "zip": 12345,
//      "town": "BZ",
//      "country": "IT"
//   }
// }
