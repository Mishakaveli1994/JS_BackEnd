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
    .create(courseData, req.user._id)
    .then((createdCourse) => {
      res.redirect('/');
    })
    .catch(next);
});

router.get('/:id([A-Za-z0-9]+)/details', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  courseService
    .getCourseById(id)
    .lean()
    // course.isEnrolled = course.usersEnrolled.some(x=> x._id === userId);
    .then((course) => {
      course.isEnrolled = courseService.isEnrolled(course, userId);
      course.isOwner = courseService.isOwner(course, userId);
      return course;
    })
    .then((course) => {
      res.render('courses/course-details', { course });
    })
    .catch(next);
});

router.get('/:courseId([A-Za-z0-9]+)/enroll', (req, res, next) => {
  const userId = req.user._id; // get user object from db
  courseService
    .getCourseById(req.params.courseId)
    .then((course) => {
      if (courseService.isEnrolled(course, userId)) {
        throw new Error('User is already enrolled');
      } else {
        courseService.enrollUser(course, userId);
      }
    })
    .then(() => {
      res.redirect(`/course/${req.params.courseId}/details`);
    })
    .catch(next);
});

router.get('/:courseId([A-Za-z0-9]+)/delete', (req, res, next) => {
  courseService
    .deleteCourse(req.params.courseId)
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
});

router.get('/:courseId([A-Za-z0-9]+)/edit', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  courseService
  // TODO: Need to be owner to edit 
  // TODO: Implement 404
    .getCourseById(id)
    .lean()
    // course.isEnrolled = course.usersEnrolled.some(x=> x._id === userId);
    .then((course) => {
      course.isEnrolled = courseService.isEnrolled(course, userId);
      course.isOwner = courseService.isOwner(course, userId);
      return course;
    })
    .then((course) => {
      res.render('courses/course-edit', { course, isChecked });
    })
    .catch(next);
});

module.exports = router;
