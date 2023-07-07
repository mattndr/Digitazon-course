import { Enrollment } from './enrollment.schema';

export const create = async (body) => {
  try {
    const enrollment = new Enrollment(body);
    await enrollment.save();
    return enrollment._id;
  } catch (err) {
    console.log(`[${new Date().toISOString()}] ERROR\n`, {
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue,
    });
  }
};

// export const userCanEnrollThisCourse = async (userId, courseId) => {
//   const course = await readCourse(courseId, {});
//   if (!course || course.seller.id) return false;
// };
