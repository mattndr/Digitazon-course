import { User } from './user.schema';

export const readOne = async (body, filters) => {
  return await User.findOne(body, filters).exec();
};

export const readUser = async (matching, filters) => {
  return await User.findOne(matching, filters).exec();
};

export const create = async (body) => {
  try {
    const user = new User(body);
    await user.save();
    return true;
  } catch {
    return;
  }
};

export const updateUser = async (_id, body) => {
  try {
    await User.updateOne({ _id }, body);
    return true;
  } catch {
    return;
  }
};
