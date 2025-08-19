const express = require("express");
const router = express.Router();

const showPendingTask = require("./showPendingTask");
const showCompletedTask = require("./showCompletedTask");
const addMark = require("./addMark");

router.use(showPendingTask);
router.use(showCompletedTask);
router.use(addMark);

module.exports = router;
