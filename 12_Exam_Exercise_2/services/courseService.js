const Course = require('../models/Course');
const User = require('../models/User');

const getAll = async (searchQuery, userId) => {
  let search = '.+';
  if (searchQuery) {
    if (!/[a-zA-Z0-9 ]+/.test(searchQuery)) {
      throw { message: 'Invalid search query' };
    }
    search = new RegExp('^[a-zA-Z0-9 ]*{}[a-zA-Z0-9 ]*$'.replace('{}', searchQuery), 'i');
  }

  return await Course.find({ title: { $regex: search } })
    .populate('usersEnrolled')
    .where({ $or: [{ creator: userId }, { isPublic: true }] })
    .sort({ createdAt: -1 })
    .lean();
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
  console.log(count);
  return Course.find({ isPublic: true }).sort({ usersEnrolled: -1 }).limit(count).lean();
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

const unenrollUser = (course, userId) => {
  course.usersEnrolled.pull(userId);
  course
    .save()
    .then(() => {
      return getUserById(userId);
    })
    .then((user) => {
      user.enrolledCourses.pull(course._id);
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

const updateOne = (courseId, courseData) => {
  return Course.updateOne({ _id: courseId }, courseData);
};

module.exports = { create, getAll, getCourseById, getMostPopular, enrollUser, isEnrolled, isOwner, deleteCourse, updateOne, unenrollUser };
