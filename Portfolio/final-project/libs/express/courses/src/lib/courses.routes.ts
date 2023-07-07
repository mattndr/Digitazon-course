import express, { Router } from 'express';
import * as controller from './courses.controller';
// import { controller as enrollmentController } from '@final-project/express/enrollments';

import { verifyIsLogged } from '@final-project/express/shared';

export const router: Router = express.Router();

// get all courses
router.get('/', controller.readAll);

// TO-FINISH
// router.post(
//   '/:id/enrollment',
//   verifyIsLogged,
//   enrollmentController.create,
//   controller.updateCourse
// );

// // [public API]
// // Get all active courses of this seller
// // get all courses of this users form /dashboard
// router.get('/users/:id/courses', controller.readCourses);

// // [private API]
// router.post('/users/:id/courses/:cid',  controller.createCourse);
// router.put('/users/:id/courses/:cid', controller.updateCourse);
// router.delete('/users/:id/courses/:cid', controller.deleteCourse);
