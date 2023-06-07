import axios from 'axios';
import group4Students from '../db/students.json' assert { type: 'json' };
import otherGroups from '../db/groups.json' assert { type: 'json' };
import dotenv from 'dotenv';

dotenv.config();

export const checkCredentials = (req, res, next) => {
  const key = req.get('key');
  if (key != process.env.KEY) {
    res.status(404).end();
    return;
  }
  next();
};

export const readAllStudents = async (req, res) => {
  let students = [];
  try {
    const requests = Object.keys(otherGroups).map((group) =>
      axios.get(group, {
        headers: { key: otherGroups[group].key },
      })
    );
    students = (await axios.all(requests)).map((r) => r.data);
  } catch (error) {
    res.status(404).send({ error: true, message: error.message });
    return;
  }
  res.send([...students, group4Students]);
};

export const readGroupStudents = (req, res) => {
  res.send(group4Students);
};
