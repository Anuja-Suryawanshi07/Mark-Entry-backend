const express = require("express");
const router = express.Router();
const  { checkAuth } = require("../../middleware/checkAuth");
// const { checkStudentRole } = require("../../middleware/checkAuth");


const getallstudent = require("./getallstudents");
const addstudent = require("./addstudent");
const updatestudent = require("./updatestudent");
const deletestudent = require("./deletestudent");
const loginstudent = require("./loginstudent");
const registerstudent = require("./registerstudent");
const getMarksByStudentId = require("./getMarksByStudentId");
const dashboard = require("./dashboard");
// const getStudentGroupsByCourseId = require("./getStudentGroupsByCourseId");
const getStudentInAGroup = require("./getStudentInAGroup");
const getStudentDetails = require("./getStudentDetails")
const scoresstudent = require("./scoresstudent");
router.use(registerstudent);
router.use(loginstudent);


router.use(checkAuth);

//Module level middleware
// router.use(checkStudentRole);

router.use(getallstudent);
router.use(addstudent);
router.use(updatestudent);
router.use(deletestudent);
router.use(loginstudent);
router.use(registerstudent);
router.use(getMarksByStudentId);
router.use(dashboard);
router.use(getStudentDetails);
//router.use(getStudentGroupsByCourseId);
router.use(getStudentInAGroup);
router.use("/marks", scoresstudent); 

module.exports = router;