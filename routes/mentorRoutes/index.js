const express = require("express");
const router = express.Router();
const showPendingTask = require("./showPendingTask");
const showApprovedTask = require("./showApprovedTask");
const addMark = require("./addMark");
const dashboard = require("./dashboard");
const taskAssigned = require("./taskAssignToMentor");

router.use(taskAssigned);
router.use(showPendingTask);
router.use(showApprovedTask);
router.use(addMark);
router.use(dashboard);

module.exports = router;
