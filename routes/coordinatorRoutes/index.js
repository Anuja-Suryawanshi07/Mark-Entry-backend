const express = require("express");
const router = express.Router();

const getAllStudentByCourseName = require("./getAllStudentByCourseName");
const getAllStudentByGroupName = require("./getAllStudentByGroupName")
const assignGroupToStudent = require("./assignGroupToStudent")
const getAllStudentWithoutGroup = require("./getAllStudentWithoutGroup")
const getAllStaffByCourseName = require("./getAllStaffByCourseName")
const addEvaluation = require("./addEvaluation")

router.use(getAllStudentByCourseName);
router.use(getAllStudentByGroupName);
router.use(assignGroupToStudent);
router.use(getAllStudentWithoutGroup);
router.use(getAllStaffByCourseName);
router.use(addEvaluation);


module.exports = router;
