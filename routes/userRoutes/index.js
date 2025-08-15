const express = require("express");
const router = express.Router();

//users

const getAlluser = require("./getallusers");
const addusers = require("./addusers");
const updateusers = require("./updateusers");
const deleteusers = require("./deleteusers");
const userRegister = require("./userRegister");
const userLogin = require("./userLogin");

router.use(getAlluser);
router.use(addusers);
router.use(updateusers);
router.use(deleteusers);
router.use(userRegister);
router.use(userLogin);

module.exports = router;
