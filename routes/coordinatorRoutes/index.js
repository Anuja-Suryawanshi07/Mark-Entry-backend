const express = require("express");
const router = express.Router();
const { checkCoordinatorRole } = require("../../middleware/checkAuth");

const getAllStudentByCourseName = require("./getAllStudentByCourseName");
const getAllStudentByGroupName = require("./getAllStudentByGroupName")
const assignGroupToStudent = require("./assignGroupToStudent")
const getAllStudentWithoutGroup = require("./getAllStudentWithoutGroup")
const getAllStaffByCourseName = require("./getAllStaffByCourseName")
const addEvaluation = require("./addEvaluation")
const dashboard = require("./dashboard");
const taskApproved = require("./taskApprove");
const submittedTasks = require("./submittedTasks")
const allApprovedTasks = require("./allApprovedTask");
const getAllPendingTask = require("./getAllPendingTask")
const getAllCompletedTask = require("./getAllCompletedTask")
const allCourses = require("./allCourses")
const getAllGroupByCourse = require("./getAllGroupByCourse")
// module level middleware
//router.use(checkCoordinatorRole);

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
router.use(getAllPendingTask);
router.use(getAllCompletedTask);
router.use(allCourses);
router.use(getAllGroupByCourse)


module.exports = router;
