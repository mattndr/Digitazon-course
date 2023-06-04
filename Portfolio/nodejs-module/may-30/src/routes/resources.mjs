import fs from 'fs/promises';
import todos from '../db/todos.json' assert { type: 'json' };
import users from '../db/users.json' assert { type: 'json' };
import usersTodos from '../db/usersTodos.json' assert { type: 'json' };
const resources = { todos, users, usersTodos };

export const read = async (req, res, resource) => {
  res.send({
    data: resources[resource],
  });
};

export const readOne = (req, res, resource) => {
  const id = req.params.id;
  if (!resources[resource][id]) {
    res.send({
      data: {},
      error: true,
      message: `${resource}: id #${id} not found`,
    });
    return;
  }
  res.send({
    data: resources[resource][id],
  });
};

export const create = async (req, res, resource) => {
  const nextId =
    Object.values(resources[resource]).length == 0
      ? 1
      : Math.max(...Object.keys(resources[resource]).map((k) => parseInt(k))) +
        1;
  const newData = JSON.stringify(
    {
      ...resources[resource],
      [nextId]: { ...req.body },
    },
    null,
    2
  );
  await fs.writeFile(`./src/db/${resource}.json`, newData);
  res.status(201).end();
};

export const update = async (req, res, resource) => {
  const id = req.params.id;
  if (!resources[resource][id]) {
    res.send({
      data: {},
      error: true,
      message: `${resource}: id #${id} not found`,
    });
    return;
  }
  const newData = JSON.stringify(
    {
      ...resources[resource],
      [id]: { ...resources[resource][id], ...req.body },
    },
    null,
    2
  );
  await fs.writeFile(`./src/db/${resource}.json`, newData);
  res.end();
};

export const remove = async (req, res, resource) => {
  const id = req.params.id;
  if (!resources[resource][id]) {
    res.send({
      data: {},
      error: true,
      message: `${resource}: id #${id} not found`,
    });
    return;
  }
  const newData = JSON.stringify(
    {
      ...resources[resource],
      [id]: { ...resources[resource][id], deleted: true },
    },
    null,
    2
  );
  await fs.writeFile(`./src/db/${resource}.json`, newData);
  res.end();
};

export const createUserTodo = async (req, res, resource) => {
  const { idu, idt } = req.params;
  if (!(idu in users && idt in todos)) {
    res.status(200).send({
      error: true,
      message: `User #${idu} or todo #${idt} not found`,
    });
    return;
  }
  const newData = JSON.stringify(
    {
      ...resources[resource],
      [`${idu}-${idt}`]: {
        idu,
        idt,
      },
    },
    null,
    2
  );
  await fs.writeFile(`./src/db/${resource}.json`, newData);
  res.status(200).end();
};

export const deleteUserTodo = async (req, res, resource) => {
  const { idu, idt } = req.params;
  if (!(`${idu}-${idt}` in resources[resource])) {
    res.status(200).send({
      error: true,
      message: `UsersTodos #${idu}-${idt} not found`,
    });
    return;
  } else {
    resources[resource][`${idu}-${idt}`]['deleted'] = true;
    await fs.writeFile(
      `./src/db/${resource}.json`,
      JSON.stringify(resources[resource], null, 2)
    );
    res.status(200).end();
  }
};

export const completedUserTodo = async (req, res, resource) => {
  const { idu, idt } = req.params;
  if (!(`${idu}-${idt}` in resources[resource])) {
    res.status(200).send({
      error: true,
      message: `UsersTodos #${idu}-${idt} not found`,
    });
    return;
  } else {
    resources[resource][`${idu}-${idt}`]['completed'] = true;
    await fs.writeFile(
      `./src/db/${resource}.json`,
      JSON.stringify(resources[resource], null, 2)
    );
    res.status(200).end();
  }
};

export const readUserTodos = (req, res, resource) => {
  const { id } = req.params;
  let todos = [];
  todos = Object.keys(resources[resource])
    .filter((key) => key.split('-')[0] == id)
    .map((key) => resources[resource][key]);
  if (todos.length == 0) {
    res.status(200).send({
      error: true,
      message: `Todos of user #${id} not found`,
    });
    return;
  }
  res.send(todos);
};
