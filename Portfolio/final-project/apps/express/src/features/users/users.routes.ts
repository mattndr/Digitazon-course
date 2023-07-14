import express, { Router } from 'express';
import * as controller from './users.controller';
import * as courseController from '../courses/courses.controller';
import {
  verifyIsLogged,
  verifyUserAuthorization,
} from '../shared/shared.middlewares';
import { verifyIsSeller, verifySellerAuthorization } from './users.middlewares';

export const router: Router = express.Router();

// Get user's private profile
router.get(
  '/:id/profile',
  verifyIsLogged,
  verifyUserAuthorization,
  controller.readPrivateProfile
);

// Update user's private profile
router.patch(
  '/:id/profile',
  verifyIsLogged,
  verifyUserAuthorization,
  controller.updatePrivateProfile
);

// Get user's public profile
router.get('/:id', controller.readPublicProfile);

// Get all active courses for this seller
router.get('/:id/courses/active', courseController.readActiveCoursesBySellerId);

// Routes for manage courses
router.post(
  '/:id/courses',
  verifyIsLogged,
  verifyIsSeller,
  courseController.create
);
router.get(
  '/:id/courses',
  verifyIsLogged,
  verifyIsSeller,
  courseController.readCoursesBySellerId
);
router.get(
  '/:id/courses/:cid',
  verifyIsLogged,
  verifyIsSeller,
  verifySellerAuthorization,
  courseController.readCourseDetails
);
router.patch(
  '/:id/courses/:cid',
  verifyIsLogged,
  verifyIsSeller,
  verifySellerAuthorization,
  courseController.updateCourse
);
router.delete(
  '/:id/courses/:cid',
  verifyIsLogged,
  verifyIsSeller,
  verifySellerAuthorization,
  courseController.deleteCourse
);
