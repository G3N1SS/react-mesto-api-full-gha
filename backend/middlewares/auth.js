const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/UnautorizedError');

const { SECRET_KEY = 'mesto-test' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(console.log(new UnautorizedError('Необходима авторизация')));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    next(console.log(new UnautorizedError('Необходима авторизация')));
    return;
  }

  req.user = payload;

  next();
};
