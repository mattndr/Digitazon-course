import express, { Router } from 'express';
import * as controller from './courses.controller';

import {
  getTokenIfPresent,
  verifyIsLogged,
  verifyUserAuthorization,
} from '@final-project/express/shared';

export const router: Router = express.Router();

// Get all published courses
router.get('/', controller.readAll);
// Get courses, using search function
router.get('/', controller.readByQueryParams);
// Get courses that the user is enrolled in
router.get('/', verifyUserAuthorization, controller.readByEnrolledUser);

// Get course details
// getTokenIfPresent ensure that when a course is started, only enrolled users can still see course details and view program status
router.get('/:id', getTokenIfPresent, controller.readOne);

// Update a course when a user enrolls the course
router.patch(
  '/:id/enrollments',
  verifyIsLogged,
  controller.addEnrollmentToCourse
);
