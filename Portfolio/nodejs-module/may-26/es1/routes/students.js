import students from '../db/students.json' assert { type: 'json' };

let nextId = students.reduce(
  (max, current) => (max > current ? max : current.id),
  -1
);

export const readStudents = (req, res) => {
  let result = students;
  const { limit, offset } = req.query;
  if (limit && offset) {
    result = result.slice(offset, +offset + +limit);
  }
  res.send(result);
};

export const readStudent = (req, res) => {
  const student = students.find((s) => s.id == req.params.id);
  student ? res.send(student) : res.status(404).end();
};

export const createStudent = (req, res) => {
  students.push({ id: ++nextId, ...req.body });
  res.status(201).end();
};

export const updateStudent = (req, res) => {
  const index = students.findIndex((s) => s.id == req.params.id);
  if (index != -1) {
    students[index] = { ...students[index], ...req.body };
    res.status(200).end();
  } else res.status(404).end();
};

export const deleteStudent = (req, res) => {
  const index = students.findIndex((s) => s.id == req.params.id);
  if (index != -1) {
    students.splice(index, 1);
    res.status(200).end();
  } else res.status(404).end();
};
