const express = require("express");
const router = express.Router();

// Import route files
const getModules = require("./getModules");
const getMarks = require("./getMarks");
const addMarks = require("./addMarks");

// Use them
router.use(getModules);
router.use(getMarks);
router.use(addMarks);

module.exports = router;
