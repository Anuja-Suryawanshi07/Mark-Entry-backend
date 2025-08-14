const express = require("express");
const router = express.Router();

//marks

const getMarks = require("./getMarks");
const addMarks = require("./addMarks");
const updateMarks = require("./updateMarks");
const deleteMarks = require("./deleteMarks");


router.use(getMarks);
router.use(addMarks);
router.use(updateMarks);
router.use(deleteMarks);


module.exports = router;