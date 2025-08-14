const express = require("express");
const router = express.Router();

const getAllCourse = require("./getallCourse");
const addCourse = require("./addCourse");
const updateCourse = require("./updateCourse");
const deleteCourse = require("./deleteCourse");
const getCourseById = require("./getCourseById");

router.use(getAllCourse);
router.use(addCourse);
router.use(updateCourse);
router.use(deleteCourse);
router.use(getCourseById);

module.exports = router;