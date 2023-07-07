import express, { Router } from 'express';
import * as controller from './users.controller';
import { controller as courseController } from '@final-project/express/courses';
import {
  verifyIsLogged,
  verifyAuthorization,
} from '@final-project/express/shared';
import { verifyIsSeller } from './users.middlewares';

export const router: Router = express.Router();

// router.get('/', controller.readAll);

// When a logged user click on his profile (infos)
router.get(
  '/:id/profile',
  verifyIsLogged,
  verifyAuthorization,
  controller.readPrivateProfile
);

// When a logged user click on his dashboard
router.get(
  '/:id/dashboard',
  verifyIsLogged,
  verifyAuthorization,
  controller.readPrivateDashboard
);

// Get all active courses of this seller
router.get('/:id/courses/active', courseController.readActiveCoursesBySellerId);

// Get all enrolled courses of this user
// router.get('/:id/courses/enrolled', verifyIsLogged,
// verifyAuthorization, courseController.readEnrolledCoursesByUserId)

// Courses management routes for sellers
router.post(
  '/:id/courses',
  verifyIsLogged,
  verifyAuthorization,
  verifyIsSeller,
  courseController.create
  // controller.addCourseToSeller
);
router.get(
  '/:id/courses',
  verifyIsLogged,
  verifyAuthorization,
  verifyIsSeller,
  courseController.readCoursesBySellerId
);
router.get(
  '/:id/courses/:cid',
  verifyIsLogged,
  verifyAuthorization,
  verifyIsSeller,
  courseController.readCourseDetails
);
router.put(
  '/:id/courses/:cid',
  verifyIsLogged,
  verifyAuthorization,
  verifyIsSeller,
  courseController.updateCourse
);
router.delete(
  '/:id/courses/:cid',
  verifyIsLogged,
  verifyAuthorization,
  verifyIsSeller,
  courseController.deleteCourse
);
