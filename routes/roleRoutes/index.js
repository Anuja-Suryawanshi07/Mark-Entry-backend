const express = require("express");
const router = express.Router();

const addRole = require("./addRole");
// const deleteRole = require("./deleteRole");
const updateRole = require("./updateRole");
const getAllRoles = require("./getAllRoles");

router.use(addRole);
// router.use(deleteRole);
router.use(updateRole);
router.use(getAllRoles);

module.exports = router;
