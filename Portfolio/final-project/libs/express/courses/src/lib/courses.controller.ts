import { Course } from './course.schema';

export const readAll = async (req, res) => {
  const courses = await Course.find().exec();
  res.send(courses);
};

export const create = async (data) => {
  try {
    const newCourse = new Course({
      creationDatetime: new Date().toISOString(),
      title: data.title,
    });
    await newCourse.save();
    return newCourse.id;
  } catch (err) {
    console.log(err);
  }
};
