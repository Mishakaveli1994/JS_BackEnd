const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/', (req, res, next) => {
  courseService
    .getAll()
    .then((courses) => {
      courses = courses.map((course) => ({ ...course, createdAt: course.createdAt.toLocaleDateString() }));
      res.render('home/home', { courses });
    })
    .catch(next);
});

module.exports = router;
