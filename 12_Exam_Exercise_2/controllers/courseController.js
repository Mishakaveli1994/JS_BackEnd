const router = require('express').Router();
const courseService = require('../services/courseService');

router.get('/create', (req, res) => {
  res.render('courses/create-course');
});

router.post('/create', (req, res, next) => {
  const { title, description, imageUrl, isPublic } = req.body;

  const courseData = {
    title,
    description,
    imageUrl,
    isPublic: Boolean(isPublic) // Also works -> !!isPublic
  };
  courseService
    .create(courseData)
    .then((createdCourse) => {
      res.redirect('/');
    })
    .catch(next);
});

router.get('/:id([A-Za-z0-9]+)/details', (req, res, next) => {
  const { id } = req.params;
  courseService
    .getById(id)
    .then((course) => {
      res.render('courses/course-details', { course });
    })
    .catch(next);
});

module.exports = router;
