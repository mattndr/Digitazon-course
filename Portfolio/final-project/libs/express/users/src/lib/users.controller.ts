import { User } from './user.schema';

export const readAll = async (req, res) => {
  // users.service.ts
  res.send(await User.find().exec());
};

// users.service.ts
export const create = async (body) => {
  try {
    const user = new User(...body);
    await user.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
