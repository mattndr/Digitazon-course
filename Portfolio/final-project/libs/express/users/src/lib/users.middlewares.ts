import { User } from './user.schema';

export const verifyIsSeller = async (req, res, next) => {
  const user = await User.findById(req.params.id).exec();
  if (!user.isSeller)
    return res
      .status(401)
      .send({
        data: {},
        error: true,
        message:
          "Utente non autorizzato. L'utente non è un venditore autorizzato.",
      });
  next();
};
