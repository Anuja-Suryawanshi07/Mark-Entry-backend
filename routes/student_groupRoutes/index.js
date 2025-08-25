const express = require("express");
const router = express.Router();



const addStudentGroupRoutes = require("./addstudentgroup");
const allstudentsgroupRoutes = require("./allstudentsgroup");
const updatestudentGroup = require("./updatestudentgroup");
const deletestudentgroup = require("./deletestudentgroup");
const getStudentGroupById = require("./getStudentGroupById");
const getStudentGroupsByCourseId = require("./getStudentGroupsByCourseId");



router.use(addStudentGroupRoutes);
router.use(allstudentsgroupRoutes);
router.use(updatestudentGroup);
router.use(deletestudentgroup);
router.use(getStudentGroupById);
router.use(getStudentGroupsByCourseId);




module.exports = router;