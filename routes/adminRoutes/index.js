
const express = require("express");
const router = express.Router();

//staff

const getAllStaff = require("./getallstaff");
const addStaff = require("./addStaff");
const updateStaff = require("./updateStaff");
const deletestaff = require("./deleteStaff");
const getAllStudents = require('./getallstudents');
const addStudentToGroup = require('./addStudentToGroup');
const dashboard = require ("./dashboard");
const getAllCourses = require("./getAllCourses");

router.use(getAllStaff);
router.use(addStaff);
router.use(updateStaff);
router.use(deletestaff);
router.use(getAllStudents);
router.use(addStudentToGroup);
router.use(dashboard);
router.use(getAllCourses);

module.exports = router;



