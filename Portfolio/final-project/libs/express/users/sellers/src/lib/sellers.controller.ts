import { create as createNewCourse } from '@final-project/express/courses';
import { Seller } from './seller.schema';
export const readAll = (req, res) => {
  res.send('all courses of ' + req.userId);
};

export const create = async (req, res) => {
  try {
    const seller = await Seller.findById(req.sellerId).exec();
    const newCourseId = await createNewCourse(req.body);
    if (!newCourseId) throw new Error('Course ID is undefined');
    seller.courses.push(newCourseId);
    await seller.save();
    res.status(201).end();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: true, message: 'Errore durante la creazione del corso' });
  }
};
