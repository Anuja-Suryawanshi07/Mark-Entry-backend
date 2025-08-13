
const express = require("express");
const router = express.Router();

//users

const getAlluser = require("./getallusers");
const addusers = require("./addusers");
const updateusers = require("./updateusers");
const deleteusers = require("./deleteusers");


router.use(getAlluser);
router.use(addusers);
router.use(updateusers);
router.use(deleteusers);

module.exports = router;



