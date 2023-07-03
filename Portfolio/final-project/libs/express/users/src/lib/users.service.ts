import { User } from './user.schema';

export const readOne = async (body, filters) => {
  return await User.findOne(body, filters).exec();
};
