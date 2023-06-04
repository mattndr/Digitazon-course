import fs from 'fs/promises';
// import users from '../db/users.json' assert { type: 'json' };
// import todos from '../db/todos.json' assert { type: 'json' };

export const readAll = async (req, res, resource) => {
  const data = await fs.readFile(`./src/db/${resource}.json`);
  res.send(data);
};

export const searchBy = async (req, res, resource) => {
  let data = JSON.parse(await fs.readFile(`./src/db/${resource}.json`));
  res.send(
    Object.keys(data)
      .filter((d) =>
        Object.keys(req.query).some((k) => data[d][k] == req.query[k])
      )
      .map((el) => {
        return { [el]: data[el] };
      })
  );
};

export const readOne = async (req, res, resource) => {
  let data = JSON.parse(await fs.readFile(`./src/db/${resource}.json`));
  console.log(data[req.params.id]);
  if (data[req.params.id]) res.send(data[req.params.id]);
  else
    res.send({
      error: true,
      message: `${resource} #${req.params.id} not found`,
    });
};

export const create = async (req, res, resource) => {
  let data = JSON.parse(await fs.readFile(`./src/db/${resource}.json`));
  const nextId = Math.max(...Object.keys(data).map((key) => parseInt(key))) + 1;
  await fs.writeFile(
    `./src/db/${resource}.json`,
    JSON.stringify({ ...data, [nextId]: req.body }, null, 2)
  );
  res.status(201).end();
};

export const update = async (req, res, resource) => {
  let data = JSON.parse(await fs.readFile(`./src/db/${resource}.json`));
  if (data[req.params.id]) {
    await fs.writeFile(
      `./src/db/${resource}.json`,
      JSON.stringify({ ...data, [req.params.id]: req.body }, null, 2)
    );
    res.send(`${resource} #${req.params.id} updated`);
  } else
    res.send({
      error: true,
      message: `${resource} #${req.params.id} not found`,
    });
};

export const deleteOne = async (req, res, resource) => {
  let data = JSON.parse(await fs.readFile(`./src/db/${resource}.json`));
  if (data[req.params.id]) {
    delete data[req.params.id];
    await fs.writeFile(
      `./src/db/${resource}.json`,
      JSON.stringify({ ...data }, null, 2)
    );
    res.send(`${resource} #${req.params.id} deleted`);
  } else
    res.send({
      error: true,
      message: `${resource} #${req.params.id} not found`,
    });
};
