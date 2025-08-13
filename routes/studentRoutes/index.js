
const express = require("express");
const router = express.Router();

//staff

const getallstudent = require("./getallstudents");
const addstudent = require("./addstudent");
const updatestudent = require("./updatestudent");
const deletestudent = require("./deletestudent");


router.use(getallstudent);
router.use(addstudent);
router.use(updatestudent);
router.use(deletestudent);

module.exports = router;



