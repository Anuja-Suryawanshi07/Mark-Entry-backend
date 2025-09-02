
const express = require("express");
const router = express.Router();

const groupApis = require('./GroupApis');
const batchApis = require('./batchApis');
const studentApis = require('./StudentApis');
const courseApis = require('./CourseApis');
const staffApis = require('./staffApis');
const ModuleApis = require('./ModuleApis');
const getAllGroupByCourses = require('./getAllGroupByCourse')
const addStudentToGroup = require('./addStudentToGroup')
const showAllCoOrdinators = require('./showAllCoOrdinators')

//Admin flow
const dashboard = require ("./dashboard");
const AllStudents = require("./allStudents");
const AssignPRN = require("./assignPRN");
const AddStudentToBatch = require("./addStudentToBatch");
//const AddMultipleStudentToBatch = require("./addMultipleStudentToBatch");
const AssignCourseToStudent = require("./AssignCourseToStudent");
const UpdateStudents = require("./updateStudent");


//staff

// const getAllStaff = require("./getallstaff");
// const addStaff = require("./addStaff");
// const updateStaff = require("./updateStaff");
// const deletestaff = require("./deleteStaff");
// const getAllStudents = require('./getallstudents');
// const addStudentToGroup = require('./addStudentToGroup');
// const getAllCourses = require("./getAllCourses");
// const getStudentDetails = require('./getStudentDetails');

// router.use(getAllStaff);
// router.use(addStaff);
// router.use(updateStaff);
// router.use(deletestaff);
// router.use(getAllStudents);
// router.use(addStudentToGroup);
// router.use(getAllCourses);
// router.use(getStudentDetails);


// router.use( addStudentToGroup);
router.use(groupApis)
router.use(batchApis)
router.use(studentApis)
router.use(courseApis)
router.use(staffApis)
router.use(ModuleApis)
router.use(getAllGroupByCourses);
router.use(addStudentToGroup);
router.use(showAllCoOrdinators);


router.use(dashboard);
router.use(AllStudents)
router.use(AssignPRN)
router.use(AddStudentToBatch);
//router.use(AddMultipleStudentToBatch);
router.use(AssignCourseToStudent);
router.use(UpdateStudents);
module.exports = router;



