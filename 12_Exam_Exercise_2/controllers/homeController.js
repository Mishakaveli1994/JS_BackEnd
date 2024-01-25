const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/', (req, res, next) => {
  // TODO: Only display public courses
  // TODO: Create un-enroll from course
  // TODO: Show enrolled users to creator (number or names ?)
  if (req.user) {
    courseService
      .getAll()
      .then((courses) => {
        courses = courses.map((course) => ({ ...course, createdAt: course.createdAt.toLocaleDateString() }));
        res.render('home/home', { courses });
      })
      .catch(next);
  } else {
    courseService
      .getMostPopular(3)
      .then((courses) => {
        courses = courses.map((course) => ({ ...course, createdAt: course.createdAt.toLocaleDateString() }));
        res.render('home/home', { courses });
      })
      .catch(next);
  }
});

module.exports = router;
