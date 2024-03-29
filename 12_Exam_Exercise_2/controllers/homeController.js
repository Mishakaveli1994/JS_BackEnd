const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/', (req, res, next) => {
  // TODO: Show enrolled users to creator (number or names ?)
  let getFunc = {};
  const searchQuery = req.query.search;
  if (req.user) {
    getFunc = courseService.getAll.bind(courseService.getAll, searchQuery, req.user._id);
  } else {
    getFunc = courseService.getMostPopular.bind(courseService.getMostPopular, 3);
  }
  getFunc()
    .then((courses) => {
      courses = courses.map((course) => ({ ...course, createdAt: course.createdAt.toLocaleDateString() }));
      res.render('home/home', { courses });
    })
    .catch(next);
});

module.exports = router;
