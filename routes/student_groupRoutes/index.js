
const express = require("express");
const router = express.Router();

//student_group

const allstudentgroup = require("./allstudentsgroup");
const addstudentgroup = require("./addstudentgroup");
const updatestudentgroup = require("./updatestudentgroup");
const deletestudentgroup = require("./deletestudentgroup");


router.use(allstudentgroup);
router.use(addstudentgroup);
router.use(updatestudentgroup);
router.use(deletestudentgroup);

module.exports = router;



