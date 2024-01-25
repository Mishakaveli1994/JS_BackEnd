const errorHandler = (err, req, res, next) => {
  console.log('Error message:');
  console.log(err);
  let errors = [];
  if (err.errors) {
    errors = Object.values(err.errors).map((i) => i.message);
  } else {
    errors = [err.message || err.msg];
  }
  err.statusCode = err.statusCode || 500;
  err.message = errors[0] || 'Internal Server Error';
  console.log(err.statusCode);
  console.log(err.message);
  res.status(err.statusCode).render('home/home', { error: err });
};

module.exports = errorHandler;
