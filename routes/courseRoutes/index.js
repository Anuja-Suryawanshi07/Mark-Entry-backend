const express = require("express");
const router = express.Router();

const getAllCourse = require("./getallCourse");
const addCourse = require("./addCourse");
const updateCourse = require("./updateCourse");
const deleteCourse = require("./deleteCourse");
const getCourseById = require("./getCourseById");
const getAllCoursesByBatchId = require("./getAllCoursesByBatchId");
const getAllCoursesByFilter = require("./getAllCoursesbyfilter");


router.use(getAllCourse);
router.use(addCourse);
router.use(updateCourse);
router.use(deleteCourse);
router.use(getCourseById);
router.use(getAllCoursesByBatchId);
router.use(getAllCoursesByFilter);

module.exports = router;