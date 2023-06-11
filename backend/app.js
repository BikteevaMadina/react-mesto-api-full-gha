require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const cors = require('cors');

const router = require('./routes/routers');

const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validation');

const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { createUser, login } = require('./controllers/authorization');

const {
  MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://dishastudy.nomoredomains.rocks',
  ],
  credentials: true,
  maxAge: 30,
}));

app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);
app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((error, request, response, next) => {
  const {
    status = 500,
    message,
  } = error;
  response.status(status)
    .send({
      message: status === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start()
  .then(() => console.log(`App started on port \n${MONGO_URL}\nPort: ${PORT}`));
