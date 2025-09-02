const express = require("express");
const router = express.Router();

const getAllCourseBatch = require("./getAllCoursesByBatchId");
const getAllCoursesbyfilter = require("./getAllCoursesbyfilter");

router.use(getAllCourseBatch);
router.use(getAllCoursesbyfilter);

module.exports = router;