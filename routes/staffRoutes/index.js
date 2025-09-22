
const express = require("express");
const router = express.Router();

//staff

const getAllStaff = require("./getallstaff");
const addStaff = require("./addstaff");
const updateStaff = require("./updatestaff");
const deletestaff = require("./deletestaff");
const dashboard = require("./dashboard");
const staffRoutes = require("./allTasks");
const staffRegister = require("./staffRegister");
const staffLogin = require("./staffLogin");
const assignStaffToCourse = require("./assignStaffToCourse");

router.use(staffLogin);
router.use(staffRegister);

//Module level middleware
//router.use(checkStaffRole);

router.use(getAllStaff);
router.use(addStaff);
router.use(updateStaff);
router.use(deletestaff);
router.use(dashboard);
router.use(staffRoutes);
router.use(staffRegister);
router.use(staffLogin);
router.use(assignStaffToCourse);


module.exports = router;



