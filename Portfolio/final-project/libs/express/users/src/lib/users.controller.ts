// import mongoose from 'mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import * as service from './users.service';

// export const readAll = async (req, res) => {
//   // users.service.ts
//   res.send(await User.find().exec());
// };

// export const readUserFullName = async (req, res) => {
//   const id = req.params.id;
//   const user = await service.readUser(
//     { _id: id },
//     { fullName: 1 }
//   );
//   user
//     ? res.send(user)
//     : res.status(404).send({ error: true, message: 'Utente non trovato' });
// };

export const readPrivateProfile = async (req, res) => {
  const id = req.params.id;
  const user = await service.readUser(
    { _id: id },
    {
      _id: 0,
      password: 0,
      // registrationDate: 0,
      // enrollments: 0,
      // seller_courses: 0,
    }
  );
  user
    ? res.send({ data: user })
    : res.status(404).send({ error: true, message: 'Utente non trovato' });
};

export const readPrivateDashboard = async (req, res) => {
  const id = req.params.id;
  const user = await service.readUser(
    { _id: id },
    { _id: 0, courses: 1, enrollments: 1, seller_courses: 1, isSeller: 1 }
  );
  user
    ? res.send({ data: user })
    : res.status(404).send({ error: true, message: 'Utente non trovato' });
};

// export const addCourseToSeller = async (req, res) => {
//   try {
//     const user = await service.addCourseToSeller(req.params.id, req.courseId);
//     if (user) res.status(201).end();
//   } catch (err) {
//     res.status(409).send({
//       error: true,
//       message: "Errore: impossibile aggiornare l'utente con i dati forniti.",
//     });
//   }
// };
