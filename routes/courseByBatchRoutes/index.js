const express = require("express");
const router = express.Router();

const getAllCourseBatch = require("./getAllCoursesByBatchId");

router.use(getAllCourseBatch);


module.exports = router;