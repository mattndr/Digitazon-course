import mongoose from 'mongoose';
import * as service from './courses.service';

export const readAll = async (req, res) => {
  const courses = await service.readCourses();
  res.send({ data: courses });
};

export const readCoursesBySellerId = async (req, res) => {
  const courses = await service.readCoursesBySellerId(req.params.id);
  res.send({ data: courses });
};

export const readActiveCoursesBySellerId = async (req, res) => {
  const courses = await service.readActiveCoursesBySellerId(req.params.id);
  res.send({ data: courses });
};

export const create = async (req, res, next) => {
  console.log(req.body);

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
    // req.courseId = course_id;
    res.status(201).send({ data: { courseId } });
    // Now updates seller document
    // next();
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
  // const course = await service.readCourseDetails(req.params);
  // if (!course)
  //   return res.status(404).send({
  //     error: true,
  //     message: "Errore: non è stato trovato nessun corso con l'id specificato.",
  //   });
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
