
const express = require("express");
const router = express.Router();

//staff

const getAllStaff = require("./getallstaff");
const addStaff = require("./addStaff");
const updateStaff = require("./updateStaff");
const deletestaff = require("./deleteStaff");
const getAllStudents = require('./getallstudents');
const addStudentToCourse = require('./addStudentToCourse');


router.use(getAllStaff);
router.use(addStaff);
router.use(updateStaff);
router.use(deletestaff);
router.use(getAllStudents);
router.use(addStudentToCourse);

module.exports = router;



