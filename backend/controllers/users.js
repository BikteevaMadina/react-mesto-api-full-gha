const userSchema = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const {
  HTTP_STATUS_OK,
} = require('../utils/constants');

module.exports.getUsers = (request, response, next) => { // получаем всех пользователей
  userSchema.find({})
    .then((users) => response.send(users))
    .catch(next);
};

module.exports.getUserById = (request, response, next) => { // получаем пользователя по id
  const { userId } = request.params;

  userSchema.findById(userId)
    .orFail()
    .then((user) => response.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Incorrect id'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('User by id not found'));
      }

      return next(err);
    });
};

module.exports.getUser = (request, response, next) => {
  userSchema.findById(request.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User cannot be found');
      }
      response.status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(BadRequestError('Incorrect data'));
      // } else if (err.message === 'NotFound') {
      //   next(new NotFoundError('User cannot be found'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (request, response, next) => { // обновление данных пользователя
  const {
    name,
    about,
  } = request.body;

  userSchema.findByIdAndUpdate(
    request.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => response.status(HTTP_STATUS_OK)
      .send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid user by id'));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (request, response, next) => { // обновление аватара пользователя
  const { avatar } = request.body;

  userSchema.findByIdAndUpdate(
    request.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => response.status(HTTP_STATUS_OK)
      .send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Invalid data to avatar update'));
      } else {
        next(err);
      }
    });
};
