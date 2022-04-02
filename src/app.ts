import express, { json, urlencoded } from 'express';
import { LISTEN_PORT, MONGO_PASS, MONGO_URL, MONGO_USER } from './constants';
import routes from './router/routes';
export const app = express();
import mongoose from 'mongoose';
import cors from 'cors';

app.use(cors());
app.use(json()) // for parsing application/json
app.use(urlencoded({ extended: true })) // for parsing application/x-www-form-
app.use(routes)



app.get('/', (req, res) => {
  res.send('SERVER IS  WORKING!');
});


start();


async function start(): Promise<void> {
  initApp().then(() => {
    mongoose.connect(MONGO_URL, {
      auth: {username: MONGO_USER, password: MONGO_PASS},
      autoIndex: true,
      authSource: 'admin',
    }, () => console.log('database connected'))
  });
}


async function initApp(): Promise<void> {
  app.listen(LISTEN_PORT, () => {
    return console.log(`App is starting on port ${LISTEN_PORT}`);
  });
}