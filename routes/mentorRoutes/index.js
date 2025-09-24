const express = require("express");
const router = express.Router();
const { checkMentorRole } = require("../../middleware/checkAuth");


const showPendingTask = require("./showPendingTask");
const showApprovedTask = require("./showApprovedTask");
const addMark = require("./addMark");
const dashboard = require("./dashboard");
const taskAssigned = require("./taskAssignToMentor");
const pendingTasksByStaffId = require("./pendingTasksByStaffId");
const getBatches = require("./getBatches");
const getCourses = require("./getCourses");
const getModules = require("./getModules");
const getGroups = require("./getGroups");


//Module level middleware
router.use(checkMentorRole);

router.use(taskAssigned);
router.use(showPendingTask);
router.use(showApprovedTask);
router.use(addMark);
router.use(dashboard);
router.use(pendingTasksByStaffId);
router.use("/", getBatches);
router.use("/", getCourses);
router.use("/", getModules);
router.use("/", getGroups);


module.exports = router;
