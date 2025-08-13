const express = require("express");
const router = express.Router();



const addstudent = require("./addstudent");
const getallstudents = require("./getallstudents");
const updatestudent = require("./updatestudent");
const deletestudent = require("./deletestudent");


router.use(addstudent);
router.use(getallstudents);
router.use(updatestudent);
router.use(deletestudent);


module.exports = router;