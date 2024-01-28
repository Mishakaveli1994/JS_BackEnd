const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = async (username, password) => {
  const userExists = await User.findOne({ username }).lean();
  if (userExists) {
    throw new Error('Username already exists!');
  }
  const user = await new User({ username, password });
  return await user.save();
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) return Promise.reject({ message: 'Invalid username or password!', statusCode: 404 });

  const areEqual = await bcrypt.compare(password, user.password);
  if (!areEqual) return Promise.reject({ message: 'Invalid username or password!', statusCode: 404 });

  const token = jwt.sign({ _id: user._id, username: user.username }, SECRET, { expiresIn: '2h' });

  return token;
};

module.exports = { register, login };
