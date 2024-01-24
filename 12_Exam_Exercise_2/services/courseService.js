const Course = require('../models/Course');

const getAll = async () => {
  return await Course.find({}).lean();
};

function create(courseData) {
  const newCourse = new Course({ ...courseData, createdAt: new Date() });

  return newCourse.save();
}

const getById = (id) => {
  return Course.findOne({ _id: id });
};

module.exports = { create, getAll, getById };
