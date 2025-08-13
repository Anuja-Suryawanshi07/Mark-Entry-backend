const express = require("express");
const router = express.Router();

const getAllCourse = require("./getallCourse");
const addCourse = require("./addCourse");
const updateCourse = require("./updateCourse");
const deleteCourse = require("./deleteCourse");

router.use(getAllCourse);
router.use(addCourse);
router.use(updateCourse);
router.use(deleteCourse);

module.exports = router;