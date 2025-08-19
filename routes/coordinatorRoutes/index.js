const express = require("express");
const router = express.Router();

const getAllStudentByCourseName = require("./getAllStudentByCourseName");


router.use(getAllStudentByCourseName);


module.exports = router;
