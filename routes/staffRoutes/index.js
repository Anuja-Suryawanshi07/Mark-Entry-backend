
const express = require("express");
const router = express.Router();

//staff

const getAllStaff = require("./getallstaff");
const addStaff = require("./addstaff");
const updateStaff = require("./updatestaff");
const deletestaff = require("./deletestaff");
const dashboard = require("./dashboard");
const staffRoutes = require("./allTasks");

router.use(getAllStaff);
router.use(addStaff);
router.use(updateStaff);
router.use(deletestaff);
router.use(dashboard);
router.use(staffRoutes);

module.exports = router;



