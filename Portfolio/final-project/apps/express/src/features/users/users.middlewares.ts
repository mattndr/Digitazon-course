import { User } from './user.schema';
import { checkSellerIdMatchingCourseId } from '../courses/courses.service';

export const verifyIsSeller = async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  if (!user.isSeller)
    return res.status(401).send({
      data: {},
      error: true,
      message:
        "Utente non autorizzato. L'utente non è un venditore autorizzato.",
    });
  next();
};

export const verifySellerAuthorization = async (req, res, next) => {
  if (!(await checkSellerIdMatchingCourseId(req.params.cid, req.userId)))
    return res
      .status(404)
      .send({ error: true, message: 'Utente non autorizzato' });
  next();
};
