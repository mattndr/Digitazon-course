// import * as service from './enrollments.service';
// import * as courseService from '@final-project/express/courses';

// export const create = async (req, res, next) => {
//   const courseId = req.params.id;
//   // const course = courseService.
//   if (!service.userCanEnrollThisCourse(req.userId, courseId)) {
//     return res.status(403).send({
//       error: true,
//       message: 'Errore: non puoi acquistare questo corso.',
//     });
//   }
//   const enrollmentId = await service.create({
//     stripePaymentId: new Date().getTime().toString(),
//     datetime: new Date().toISOString(),
//   });
//   if (enrollmentId) {
//     req.enrollmentId = enrollmentId;
//     //res.status(201).end();
//     // Now updates course document

//     // Then updates User
//     next();
//   } else
//     res.status(409).send({
//       error: true,
//       message: 'Errore: impossibile creare un corso con i dati forniti.',
//     });
// };
