import fs from 'fs/promises';
import axios from 'axios';
import todos from '../db/todos.json' assert { type: 'json' };
import users from '../db/users.json' assert { type: 'json' };
import usersTodos from '../db/usersTodos.json' assert { type: 'json' };
const resources = { todos, users, usersTodos };
const TOKEN = 'abcde12345';

export const find = (req, res, resource) => {
  res.send({ data: resources[resource] });
};

export const findOne = (req, res, resource) => {
  const id = req.params.id;
  if (!(id in resources[resource])) {
    res.status(200).send({
      error: true,
      message: `Resource '${resource}' with id #${id} not found`,
    });
    return;
  }
  res.send({ data: resources[resource][id] });
};

// POST
export const create = async (req, res, resource) => {
  const keys = Object.keys(resources[resource]).map((k) => parseInt(k));
  const nextId = keys.length > 0 ? Math.max(keys.length) + 1 : 1;
  let dataToWrite = { ...resources[resource] };

  if (resource == 'users') {
    await axios
      .get(`https://fakestoreapi.com/users/${nextId}`)
      .then(async function (response) {
        if (!response.data) throw `No user returned`;
        dataToWrite = { ...dataToWrite, [nextId]: response.data };
        delete dataToWrite[nextId].id;
      })
      .catch(function (error) {
        console.log(error);
        dataToWrite = { ...dataToWrite, [nextId]: req.body };
      });
  } else dataToWrite = { ...dataToWrite, [nextId]: req.body };

  await fs.writeFile(
    `src/db/${resource}.json`,
    JSON.stringify(dataToWrite, null, 2)
  );
  res.status(201).end();
};

export const update = async (req, res, resource) => {
  if (req.headers.token != TOKEN) {
    res.send({
      error: true,
      message: `The provided token is not correct`,
    });
    return;
  }
  const id = req.params.id;
  if (!(id in resources[resource])) {
    res.send({
      error: true,
      message: `Resource '${resource}' with id #${id} not found`,
    });
    return;
  }
  const dataToWrite = {
    ...resources[resource],
    [id]: { ...resources[resource][id], ...req.body },
  };
  await fs.writeFile(
    `src/db/${resource}.json`,
    JSON.stringify(dataToWrite, null, 2)
  );
  res.end();
};

export const remove = async (req, res, resource) => {
  if (req.headers.token != TOKEN) {
    res.send({
      error: true,
      message: `The provided token is not correct`,
    });
    return;
  }
  const id = req.params.id;
  if (!(id in resources[resource])) {
    res.send({
      error: true,
      message: `Resource '${resource}' with id #${id} not found`,
    });
    return;
  }
  const dataToWrite = {
    ...resources[resource],
  };
  dataToWrite[id].deleted = true;
  await fs.writeFile(
    `src/db/${resource}.json`,
    JSON.stringify(dataToWrite, null, 2)
  );
  res.end();
};
