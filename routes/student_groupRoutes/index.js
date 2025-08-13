const express = require("express");
const router = express.Router();



const addStudentGroupRoutes = require("./addstudentgroup");
const allstudentsgroupRoutes = require("./allstudentsgroup");
const updatestudentGroup = require("./updatestudentgroup");
const deletestudentgroup = require("./deletestudentgroup");


router.use(addStudentGroupRoutes);
router.use(allstudentsgroupRoutes);
router.use(updatestudentGroup);
router.use(deletestudentgroup);


module.exports = router;