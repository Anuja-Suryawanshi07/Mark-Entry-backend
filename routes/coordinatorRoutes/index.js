const express = require("express");
const router = express.Router();

const getAllStudentByCourseName = require("./getAllStudentByCourseName");
const dashboard = require("./dashboard");
const taskApproved = require("./taskApproved");
const submittedTasks = require("./submittedTasks")
const allApprovedTasks = require("./allApprovedTask");


router.use(allApprovedTasks);
router.use(submittedTasks);
router.use(taskApproved);
router.use(getAllStudentByCourseName);
router.use(dashboard);


module.exports = router;
