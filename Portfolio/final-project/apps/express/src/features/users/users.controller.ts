import * as service from './users.service';
import { readActiveCoursesBySellerId } from '../courses/courses.service';

export const readPrivateProfile = async (req, res) => {
  const id = req.params.id;
  if (req.query) {
    Object.keys(req.query).forEach(
      (k) => (req.query[k] = parseInt(req.query[k]))
    );
  }
  const user = await service.readUser(
    { _id: id },
    req.query
      ? req.query
      : {
          _id: 0,
          password: 0,
        }
  );
  user
    ? res.send({ data: user })
    : res.status(404).send({ error: true, message: 'Utente non trovato' });
};

export const updatePrivateProfile = async (req, res) => {
  const _id = req.params.id;
  const user = await service.updateUser({ _id }, req.body);
  user
    ? res.send({ data: user })
    : res.status(404).send({ error: true, message: 'Utente non trovato' });
};

export const readPublicProfile = async (req, res) => {
  const _id = req.params.id;
  const user = await service.readUser(
    { _id, isSeller: true },
    { fullName: 1, sellerProfile: 1 }
  );
  const publicatedCourses = await readActiveCoursesBySellerId(_id, {
    title: 1,
    description: 1,
  });
  user
    ? res.send({ data: { user, publicatedCourses } })
    : res.status(404).send({ error: true, message: 'Utente non trovato' });
};
