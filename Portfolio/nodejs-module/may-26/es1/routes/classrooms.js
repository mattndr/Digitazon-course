import classrooms from '../db/classrooms.json' assert { type: 'json' };
import students from '../db/students.json' assert { type: 'json' };

let nextId = classrooms.reduce(
  (max, current) => (max > current ? max : current.id),
  -1
);

export const readClassrooms = (req, res) => {
  let result = [];
  let keys = Object.keys(req.query);

  result = users.filter((c) => keys.some((k) => c[k] == req.query[k]));
  console.log(result);
  res.send(result);
};

export const readClassroom = (req, res) => {
  const classroom = classrooms.find((s) => s.id == req.params.id);
  classroom ? res.send(classroom) : res.status(404).end();
};

export const readClassroomStudents = (req, res) => {
  const classroom = classrooms.find((s) => s.id == req.params.id);
  if (!classroom) return res.send(404).end();
  res.send(students.filter((s) => s.classroom == req.params.id));
};

export const createClassroom = (req, res) => {
  classrooms.push({ id: ++nextId, ...req.body });
  res.status(201).end();
};

export const updateClassroom = (req, res) => {
  const index = classrooms.findIndex((s) => s.id == req.params.id);
  if (index != -1) {
    classrooms[index] = { ...classrooms[index], ...req.body };
    res.status(200).end();
  } else res.status(404).end();
};

export const deleteClassroom = (req, res) => {
  const index = classrooms.findIndex((s) => s.id == req.params.id);
  if (index != -1) {
    classrooms.splice(index, 1);
    for (let i = students.length - 1; i >= 0; i--) {
      if (students[i].classroom == req.params.id) students.splice(i, 1);
    }
    res.status(200).end();
  } else res.status(404).end();
};
