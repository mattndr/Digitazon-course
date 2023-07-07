import { User } from './user.schema';

export const readOne = async (body, filters) => {
  return await User.findOne(body, filters).exec();
};

export const readUser = async (matching, filters) => {
  return await User.findOne(matching, filters).exec(); //, { email: 1, fullName: 1 }).exec();
};

export const create = async (body) => {
  try {
    const user = new User(body);
    await user.save();
    return true;
  } catch (err) {
    console.log(`[${new Date().toISOString()}] ERROR\n`, err);
  }
};

// export const addCourseToSeller = async (id, newCourseId) => {
//   try {
//     const user = await User.findById(id).exec();
//     user.seller_courses.push(newCourseId);
//     await user.save();
//     return user;
//   } catch (err) {
//     console.log(`[${new Date().toISOString()}] ERROR\n`, {
//       code: err.code,
//       keyPattern: err.keyPattern,
//       keyValue: err.keyValue,
//     });
//   }
// };
