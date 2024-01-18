const config = {
  development: {
    PORT: 5000,
    DB_CONNECTION: 'mongodb://localhost:27017/cubicle',
    SALT_ROUNDS: 10,
    SECRET: 'someSecret',
    COOKIE_NAME: 'USER_SESSION'
  },
  production: {
    PORT: 80,
    SALT_ROUNDS: 10,
    SECRET: 'someSecret',
    COOKIE_NAME: 'USER_SESSION'
  }
};

module.exports = config[process.env.NODE_ENV.trim()];
// trim is needed as when setting in package.json the space at the end is also evaluated : "SET NODE_ENV=development && nodemon ./index.js",
