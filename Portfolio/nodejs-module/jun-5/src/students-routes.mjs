import students from '../db/students.json' assert { type: 'json' };
import getData from '../scripts/fetchOtherGroups.mjs';

export const firstPage = (req, res) => {
  res.send('ciao');
};

export const getGroupStudents = (req, res) => {
  res.send(students);
};

export const getCompleteRegister = async (req, res) => {
  const result = await getData();
  console.log(result);
  res.send(result);
};

export const showKey = (req, res) => {
  if (req.headers.key) {
    if (req.headers.key) res.send(req.header.key);
  } else res.send(req.header);
};
