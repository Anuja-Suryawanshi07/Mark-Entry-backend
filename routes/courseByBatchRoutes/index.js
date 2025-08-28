const express = require("express");
const router = express.Router();

const getAllCourseBatch = require("./getAllCoursesByBatchId");
const getAllCourses = require("./getAllCourses");

router.use(getAllCourseBatch);
router.use(getAllCourses);

module.exports = router;