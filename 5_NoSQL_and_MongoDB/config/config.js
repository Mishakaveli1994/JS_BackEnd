const config = {
  development: {
    PORT: 5000
  },
  production: {
    PORT: 80
  }
};

module.exports = config[process.env.NODE_ENV.trim()];
// trim is needed as when setting in package.json the space at the end is also evaluated : "SET NODE_ENV=development && nodemon ./index.js",
