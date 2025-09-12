const express = require("express");
const router = express.Router();
const { checkMentorRole } = require("../../middleware/checkAuth");


const showPendingTask = require("./showPendingTask");
const showApprovedTask = require("./showApprovedTask");
const addMark = require("./addMark");
const dashboard = require("./dashboard");
const taskAssigned = require("./taskAssignToMentor");

//Module level middleware
router.use(checkMentorRole);

router.use(taskAssigned);
router.use(showPendingTask);
router.use(showApprovedTask);
router.use(addMark);
router.use(dashboard);

module.exports = router;
