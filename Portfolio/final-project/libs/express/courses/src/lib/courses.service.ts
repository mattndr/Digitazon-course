import mongoose from 'mongoose';
import { Course } from './course.schema';

export const create = async (body) => {
  try {
    const course = new Course(body);
    await course.save();
    return course._id;
  } catch {
    return;
  }
};

export const readCourse = async (id, extraFieldsToSelect) => {
  try {
    return await Course.find(
      {
        id: new mongoose.Types.ObjectId(id),
        deleted: false,
        startingDatetime: null,
      },
      {
        seller: 1,
        title: 1,
        description: 1,
        presentationVideoUrl: 1,
        imageUrl: 1,
        price: 1,
        ...extraFieldsToSelect,
      }
    )
      .where('publicationDatetime')
      .ne(null)
      .exec();
  } catch {
    return;
  }
};

export const readAll = async () => {
  try {
    return await Course.find(
      {
        deleted: false,
        startingDatetime: null,
      },
      { seller: 1, title: 1, imageUrl: 1, price: 1, description: 1 }
    )
      .where('publicationDatetime')
      .ne(null)
      .exec();
  } catch {
    return;
  }
};

export const readByEnrolledUser = async (uid) => {
  try {
    return await Course.find(
      {
        enrolledUsers: {
          $elemMatch: { $eq: new mongoose.Types.ObjectId(uid) },
        },
      },
      { seller: 1, title: 1, endingDatetime: 1 }
    );
  } catch {
    return;
  }
};

export const readBySearchParams = async (pattern) => {
  try {
    return await Course.find(
      {
        $or: [
          { title: { $regex: pattern, $options: 'i' } },
          { description: { $regex: pattern, $options: 'i' } },
        ],
        deleted: false,
        publicationDatetime: { $ne: null },
        startingDatetime: { $eq: null },
      },
      {
        seller: 1,
        title: 1,
        endingDatetime: 1,
        description: 1,
        imageUrl: 1,
        price: 1,
      }
    );
  } catch {
    return;
  }
};

export const readOne = async (_id) => {
  try {
    return await Course.findOne(
      {
        _id,
        deleted: false,
      },
      {
        seller: 1,
        title: 1,
        description: 1,
        presentationVideoUrl: 1,
        imageUrl: 1,
        price: 1,
        todos: 1,
        enrolledUsers: 1,
        startingDatetime: 1,
      }
    );
    // .where('publicationDatetime')
    // .ne(null)
    // .exec();
  } catch {
    return;
  }
};

export const readCoursesBySellerId = async (id) => {
  return await Course.find(
    {
      $and: [{ 'seller.id': id }, { deleted: { $eq: false } }],
    },
    {
      title: 1,
      description: 1,
      presentationVideoUrl: 1,
      imageUrl: 1,
      price: 1,
      todos: 1,
      creationDatetime: 1,
      publicationDatetime: 1,
      startingDatetime: 1,
      endingDatetime: 1,
    }
  ).exec();
};

export const checkSellerIdMatchingCourseId = async (cid, sid) => {
  return await Course.exists({
    $and: [{ _id: cid }, { 'seller.id': sid }, { deleted: { $eq: false } }],
  }).exec();
};

export const readActiveCoursesBySellerId = async (id, filters) => {
  try {
    const courses = await Course.find(
      {
        $and: [
          { 'seller.id': id },
          { deleted: { $eq: false } },
          { publicationDatetime: { $ne: null } },
          { startingDatetime: { $eq: null } },
        ],
      },
      filters
    ).exec();
    return courses;
  } catch {
    return [];
  }
};

export const readCourseDetails = async (id, cid) => {
  try {
    return await Course.findOne({
      'seller.id': id,
      _id: cid,
      deleted: false,
    })
      .populate('enrolledUsers', { fullName: 1, email: 1 })
      .exec();
  } catch {
    return;
  }
};

export const updateCourse = async (cid, body) => {
  try {
    await Course.findOneAndUpdate({ _id: cid, deleted: false }, body);
    return true;
  } catch {
    return;
  }
};

export const addEnrollmentToCourse = async (cid, userId) => {
  try {
    const course = await Course.findOne({
      _id: cid,
      deleted: false,
      startingDatetime: null,
      // 'seller.id': { $ne: userId },
      // enrolledUsers: { $nin: userId },
    });
    if (!course) return false;
    course.enrolledUsers.push(userId);
    await course.save();
    return true;
  } catch {
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
