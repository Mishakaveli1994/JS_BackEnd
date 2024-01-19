const User = require('../models/User');
const bcrypt = require('bcrypt');
const config = require('../config/index.js');
const jwt = require('jsonwebtoken');

const register = async ({ username, password }) => {
  await User.exists({ username }).then((result) => {
    if (result) {
      throw new Error('Username already exists !');
    }
  });

  const salt = await bcrypt.genSalt(config.SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  const user = new User({ username, password: hash });
  return await user.save();
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });

  if (!user) throw new Error('Invalid username!');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password!');

  const token = jwt.sign({ id: user._id, roles: ['admin'] }, config.SECRET);
  return token;
};

module.exports = {
  register,
  login
};
