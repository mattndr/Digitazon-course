import mongoose from 'mongoose';
import * as service from './courses.service';

export const readAll = async (req, res, next) => {
  if (Object.keys(req.query).length) return next();
  const courses = await service.readAll();
  if (!courses)
    return res.status(404).send({
      error: true,
      message: 'Errore: nessun corso trovato.',
    });
  res.send({ data: courses });
};

export const readByQueryParams = async (req, res, next) => {
  let courses = undefined;
  if (req.query.enrolledUser) return next();
  courses = await service.readBySearchParams(req.query.search);
  res.send({ data: courses });
};

export const readByEnrolledUser = async (req, res) => {
  const courses = await service.readByEnrolledUser(req.query.enrolledUser);
  res.send({ data: courses });
};

export const readOne = async (req, res) => {
  const course = await service.readOne(req.params.id);
  if (!course)
    return res.status(404).send({
      error: true,
      message: "Errore: non è stato trovato nessun corso con l'id specificato.",
    });
  else {
    if (course.startingDatetime !== null) {
      if (!course.enrolledUsers.some((user) => user.valueOf() == req.userId)) {
        return res
          .status(401)
          .send({ error: true, message: 'Errore: utente non autorizzato.' });
      }
    }
    res.send({ data: course });
  }
};

export const readCoursesBySellerId = async (req, res) => {
  const courses = await service.readCoursesBySellerId(req.params.id);
  res.send({ data: courses });
};

export const readActiveCoursesBySellerId = async (req, res) => {
  const courses = await service.readActiveCoursesBySellerId(req.params.id, {});
  res.send({ data: courses });
};

export const create = async (req, res) => {
  const courseId = await service.create({
    seller: {
      id: new mongoose.Types.ObjectId(req.params.id),
      fullName: req.body.seller.fullName,
    },
    creationDatetime: new Date().toISOString(),
    title: req.body.title,
    description: req.body.description,
    presentationVideoUrl: req.body.presentationVideoUrl,
    price: req.body.price,
  });
  if (courseId) {
    res.status(201).send({ data: { courseId } });
  } else
    res.status(409).send({
      error: true,
      message: 'Errore: impossibile creare un corso con i dati forniti.',
    });
};

export const readCourseDetails = async (req, res) => {
  const course = await service.readCourseDetails(req.params.id, req.params.cid);
  if (!course)
    return res.status(404).send({
      error: true,
      message: "Errore: non è stato trovato nessun corso con l'id specificato.",
    });
  res.send({ data: course });
};

export const updateCourse = async (req, res) => {
  const courseHasBeenUpdated = await service.updateCourse(
    req.params.cid,
    req.body
  );
  if (!courseHasBeenUpdated) {
    return res.status(409).send({
      error: true,
      message:
        "Errore: non è stato possibile aggiornare il corso con l'id specificato.",
    });
  }
  res.status(200).end();
};

export const addEnrollmentToCourse = async (req, res) => {
  const courseHasBeenUpdated = await service.addEnrollmentToCourse(
    req.params.id,
    req.userId
  );
  if (!courseHasBeenUpdated) {
    return res.status(409).send({
      error: true,
      message: 'Errore: non è stato possibile iscriversi al corso.',
    });
  }
  res.status(200).end();
};

export const deleteCourse = async (req, res) => {
  const courseHasBeenDeleted = await service.updateCourse(req.params.cid, {
    deleted: true,
  });
  if (!courseHasBeenDeleted) {
    return res.status(409).send({
      error: true,
      message:
        "Errore: non è stato possibile cancellare il corso con l'id specificato.",
    });
  }
  res.status(200).end();
};
