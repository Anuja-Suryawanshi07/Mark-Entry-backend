const express = require("express");
const router = express.Router();

const getAllStudentByCourseName = require("./getAllStudentByCourseName");
const getAllStudentByGroupName = require("./getAllStudentByGroupName")
const assignGroupToStudent = require("./assignGroupToStudent")
const getAllStudentWithoutGroup = require("./getAllStudentWithoutGroup")
const getAllStaffByCourseName = require("./getAllStaffByCourseName")
const addEvaluation = require("./addEvaluation")
const dashboard = require("./dashboard");
const taskApproved = require("./taskApproved");
const submittedTasks = require("./submittedTasks")
const allApprovedTasks = require("./allApprovedTask");


router.use(allApprovedTasks);
router.use(submittedTasks);
router.use(taskApproved);
router.use(getAllStudentByCourseName);
router.use(getAllStudentByGroupName);
router.use(assignGroupToStudent);
router.use(getAllStudentWithoutGroup);
router.use(getAllStaffByCourseName);
router.use(addEvaluation);
router.use(dashboard);


module.exports = router;
