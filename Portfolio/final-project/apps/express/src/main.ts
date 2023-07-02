import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { router as auth } from '@final-project/express/auth';
import { Course, router as courses } from '@final-project/express/courses';
import {
  Seller,
  router as sellers,
} from '@final-project/express/users/sellers';
import { Buyer } from '@final-project/express/users/buyers';

// config file
dotenv.config({ path: __dirname + '../.env' });

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

async function startDbConnection() {
  try {
    await mongoose.connect(process.env.DB_URL);

    // const newSeller = new Seller({email: 'seller@a.com', password: 'test'})
    // await newSeller.save();
    // const newBuyer = new Seller({email: 'buyer@a.com', password: 'test'})
    // await newBuyer.save();
    // const buyer = await Buyer.findOne({ email: 'a@b.com' }).exec();
    // const newSeller = new Seller({ user: buyer.id });
    // await newSeller.save();
    // const newSeller = new Seller({
    //   email: 'a@b.com',
    //   password: 'test',
    //   phoneNumber: '12347566789',
    //   fullName: {
    //     firstName: 'a',
    //     lastName: 'b',
    //   },
    //   birthDate: new Date().toISOString(),
    //   address: {
    //     streetAddress: '12 Street',
    //     zip: 12345,
    //     town: 'Venice',
    //     country: 'IT',
    //   },
    // });
    // await newSeller.save();

    // // const newSeller = await Seller.findOne({ email: 'a@b.com' });
    // // const course = await Course.findOne({ title: 'My first Course' });

    // const course = new Course({
    //   seller_id: newSeller._id,
    //   creationDatetime: new Date().toISOString(),
    //   title: 'My first Course',
    // });
    // await course.save();

    // newSeller.courses_id.push(course._id);
    // await newSeller.save();

    // newSeller.courses_id.push(course._id);
    // await newSeller.save();

    //  const course = await Seller.findOne({ title: '"My first Course"' });
    // // seller.schema.eachPath(function (path) {
    // //   console.log(path);
    // // });

    // // seller.courses.push({
    // //   seller_id: seller._id,
    // //   creationDatetime: '2023-06-29T17:09:38.760Z',
    // //   title: 'My first course',
    // // });

    // // // // const course = seller.courses.find((el) => el.title == 'My first course');
    // // // // course.todos.push({ title: 'Introduction', rank: 1 });
    // await seller.save();

    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startDbConnection();

app.use(express.json());
app.use(cors());
// helps to stores the session data on the client within a cookie without requiring any database/resources on the server side
app.use(
  cookieSession({
    name: 'app-session',
    secret: 'COOKIE_SECRET', // should use as secret environment variable
    httpOnly: true,
  })
);
app.use('/auth', auth);
app.use('/courses', courses);
// app.use('/buyers', buyers);
app.use('/seller', sellers);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});
