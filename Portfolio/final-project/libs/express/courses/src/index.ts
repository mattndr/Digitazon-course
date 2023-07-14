export * from './lib/courses.routes';
export * as controller from './lib/courses.controller';
export * from './lib/course.schema';
export {
  checkSellerIdMatchingCourseId,
  readActiveCoursesBySellerId,
} from './lib/courses.service';
