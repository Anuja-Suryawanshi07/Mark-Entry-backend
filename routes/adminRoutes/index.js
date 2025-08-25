
const express = require("express");
const router = express.Router();

const groupApis = require('./GroupApis');
const batchApis = require('./batchApis');
const studentApis = require('./StudentApis');
const courseApis = require('./CourseApis');
const staffApis = require('./staffApis');
const ModuleApis = require('./ModuleApis');

//staff

// const getAllStaff = require("./getallstaff");
// const addStaff = require("./addStaff");
// const updateStaff = require("./updateStaff");
// const deletestaff = require("./deleteStaff");
// const getAllStudents = require('./getallstudents');
// const addStudentToGroup = require('./addStudentToGroup');
const dashboard = require ("./dashboard");
// const getAllCourses = require("./getAllCourses");
// const getStudentDetails = require('./getStudentDetails');

// router.use(getAllStaff);
// router.use(addStaff);
// router.use(updateStaff);
// router.use(deletestaff);
// router.use(getAllStudents);
// router.use(addStudentToGroup);
router.use(dashboard);
// router.use(getAllCourses);
// router.use(getStudentDetails);


// router.use( addStudentToGroup);
router.use(groupApis)
router.use(batchApis)
router.use(studentApis)
router.use(courseApis)
router.use(staffApis)
router.use(ModuleApis)


module.exports = router;



