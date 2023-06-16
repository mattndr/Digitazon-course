import * as service from './users.service.mjs';

export const readUsers = async (req, res) => {
  const users = await service.readUsers();
  if (!users) {
    res
      .status(404)
      .send({ data: {}, error: true, message: `Cannot read users` });
    return;
  }
  res.send(users);
};

export const readUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await service.readUser(userId);
  if (!user) {
    res
      .status(404)
      .send({ data: {}, error: true, message: `Cannot read user #${userId}` });
    return;
  }
  res.send(user);
};
