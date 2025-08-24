const express = require("express");
const router = express.Router();
const showPendingTask = require("./showPendingTask");
const showCompletedTask = require("./showCompletedTask");
const addMark = require("./addMark");
const dashboard = require("./dashboard");
const taskAssigned = require("./taskAssign");

router.use(taskAssigned);
router.use(showPendingTask);
router.use(showCompletedTask);
router.use(addMark);
router.use(dashboard);

module.exports = router;
