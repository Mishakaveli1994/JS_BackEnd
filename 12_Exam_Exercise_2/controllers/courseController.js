const router = require('express').Router();
const courseService = require('../services/courseService');

// TODO: For create and course access user needs to be authenticated otherwise 404
// TODO: When displaying messages/ show them on current page and DO NOT REDIRECT / add to locals maybe ?
// TODO: On forms show error below each field 
// TODO: Return multiple errors
// TODO: Create search - with get and querystring
// TODO: If you have time, implement AJAX 

router.get('/create', (req, res) => {
  res.render('courses/create');
});

router.post('/create', (req, res, next) => {
  const courseData = extractCourseData(req);
  courseService
    .create(courseData, req.user._id)
    .then((createdCourse) => {
      const success = { message: 'Course created successfully!' };
      return res.render('home/home', { success });
    })
    .catch(next);
});

router.get('/:courseId([A-Za-z0-9]+)/details', (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  courseService
    .getCourseById(courseId)
    .lean()
    // course.isEnrolled = course.usersEnrolled.some(x=> x._id === userId);
    .then((course) => {
      course.isEnrolled = courseService.isEnrolled(course, userId);
      course.isOwner = courseService.isOwner(course, userId);
      return course;
    })
    .then((course) => {
      res.render('courses/details', { course });
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
  const { courseId } = req.params;
  const userId = req.user._id;
  // TODO: Need to be owner to edit
  // TODO: Implement 404
  courseService
    .getCourseById(courseId)
    .lean()
    .then((course) => {
      course.isOwner = courseService.isOwner(course, userId);
      return course;
    })
    .then((course) => {
      const isPublic = course.isPublic ? 'checked' : '';
      res.render('courses/edit', { course, isPublic });
    })
    .catch(next);
});

router.post('/:courseId([A-Za-z0-9]+)/edit', (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  const courseData = extractCourseData(req);

  // TODO: Need to be owner to edit
  // TODO: Implement 404
  courseService
    .updateOne(courseId, courseData)
    .then(() => {
      res.redirect(`/course/${courseId}/details`);
    })
    .catch(next);
});

function extractCourseData(req) {
  const { title, description, imageUrl, isPublic } = req.body;

  const courseData = {
    title,
    description,
    imageUrl,
    isPublic: Boolean(isPublic) // Also works -> !!isPublic
  };

  return courseData;
}

module.exports = router;
