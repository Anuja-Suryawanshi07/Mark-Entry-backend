const express = require("express");
const router = express.Router();

//module
const getAllModule = require("./getallModule");
const addModule = require("./addModule");
const updateModule = require("./updateModule");
const deleteModule = require("./deleteModule");
const getModuleById = require("./getModuleById");
const getModulesByCourseId = require("./getModulesByCourseId");

router.use(getAllModule);
router.use(addModule);
router.use(updateModule);
router.use(deleteModule);
router.use(getModuleById);
router.use(getModulesByCourseId);

module.exports = router;
