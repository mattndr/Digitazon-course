import registeredUsers from '../db/users.json' assert { type: 'json' };
import fs from 'fs/promises';
let currentSession;

export const signup = async (req, res) => {
  const id = req.body.username,
    password = req.body.password;

  if (!(id && password)) {
    res.send({
      error: true,
      message: `Username or password are missing`,
    });
    return;
  }
  if (id in registeredUsers) {
    res.send({
      error: true,
      message: `Username ${id} is already registered`,
    });
    return;
  }
  const dataToWrite = { ...registeredUsers, [id]: { ...req.body } };
  delete dataToWrite[id].username;
  await fs.writeFile(
    'src/db/registeredUsers.json',
    JSON.stringify(dataToWrite, null, 2)
  );
  res.status(201).end();
};

export const login = async (req, res, next) => {
  const id = req.body.username,
    password = req.body.password;
  if (!(id && password)) {
    res.send({
      error: true,
      message: `Missing username and/or password`,
    });
    return;
  }
  if (!(id in registeredUsers)) {
    res.send({
      error: true,
      message: `Username ${id} not found`,
    });
    return;
  }
  // if (registeredUsers[id].isLogged == true) {
  //   res.send({
  //     error: true,
  //     message: `Username ${id} already logged in`,
  //   });
  //   return;
  // }
  if (registeredUsers[id].password !== password) {
    res.send({
      error: true,
      message: `Password for user '${id}' is not correct`,
    });
    return;
  }
  // const dataToWrite = {
  //   ...registeredUsers,
  // };
  // dataToWrite[id].isLogged = true;
  // dataToWrite[id].sessionExpires = new Date(new Date().setMinutes(now.getMinutes() + 1))
  // await fs.writeFile(
  //   'src/db/registeredUsers.json',
  //   JSON.stringify(dataToWrite, null, 2)
  // );
  req.session.userId = id; // saveUninitialized: false,
  console.log(req.session);
  res.status(200).end();
};

export const session = (req, res) => {
  const id = req.params.username;
  if (!(id in registeredUsers)) {
    res.send({
      error: true,
      message: `Username ${id} not found`,
    });
    return;
  }
  if (!req.session.userId) {
    res.send({
      error: true,
      message: `Session for ${id} expired`,
    });
    return;
  }
  const dataToReturn = structuredClone(registeredUsers[id]);
  delete dataToReturn.password;
  res.send(dataToReturn);
};
