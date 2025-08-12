const express = require("express");
const router = express.Router();

//module
const getAllModule = require("./getallModule");
const addModule = require("./addModule");
const updateModule = require("./updateModule");
const deleteModule = require("./deleteModule");

app.use("/", getAllModule);
app.use("/", addModule);
app.use("/", updateModule);
app.use("/", deleteModule);

module.exports = router;