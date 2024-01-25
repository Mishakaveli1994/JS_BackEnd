const Course = require('../models/Course');
const User = require('../models/User');

const getAll = async () => {
  return await Course.find({}).populate('usersEnrolled').sort({ createdAt: -1 }).lean();
};

function create(courseData, userId) {
  const newCourse = new Course({ ...courseData, createdAt: new Date(), creator: userId });

  return newCourse.save();
}

const getUserById = (id) => {
  return User.findOne({ _id: id });
};

const getCourseById = (id) => {
  return Course.findOne({ _id: id });
};

const getMostPopular = (count) => {
  return Course.find({}).limit(count).lean(); // TODO: Order by number of enrolled users
};

const enrollUser = (course, userId) => {
  course.usersEnrolled.push(userId);
  course
    .save()
    .then(() => {
      return getUserById(userId);
    })
    .then((user) => {
      user.enrolledCourses.push(course._id);
      user.save();
    });
};

const isEnrolled = (course, userId) => {
  return course.usersEnrolled.toString().includes(userId);
};

const isOwner = (course, userId) => {
  return course.creator.toString() === userId;
};

const deleteCourse = async (courseId) => {
  const course = await getCourseById(courseId);
  await User.updateMany({ _id: { $in: course.usersEnrolled } }, { $pull: { enrolledCourses: course._id } });
  await Course.deleteOne({ _id: course._id });
};

module.exports = { create, getAll, getCourseById, getMostPopular, enrollUser, isEnrolled, isOwner, deleteCourse };
