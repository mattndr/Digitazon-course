import express from 'express';
import {
  createStudent,
  deleteStudent,
  readStudent,
  readStudents,
  updateStudent,
} from './routes/students.js';
import {
  createClassroom,
  deleteClassroom,
  readClassroom,
  readClassroomStudents,
  readClassrooms,
  updateClassroom,
} from './routes/classrooms.js';

const app = express();
app.use(express.json());
const port = 3000;

app.get('/students', readStudents);
app.get('/students/:id', readStudent);
app.post('/students', createStudent);
app.put('/students/:id', updateStudent);
app.delete('/students/:id', deleteStudent);

app.get('/classrooms', readClassrooms);
app.get('/classrooms/:id', readClassroom);
app.get('/classrooms/:id/students', readClassroomStudents);
app.post('/classrooms', createClassroom);
app.put('/classrooms/:id', updateClassroom);
app.delete('/classrooms/:id', deleteClassroom);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
