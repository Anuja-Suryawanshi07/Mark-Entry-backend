const express = require("express");
const router = express.Router();

const addBatch = require("./addBatch");
const deleteBatch = require("./deleteBatch");
const updateBatch = require("./updateBatch");
const getAllBatch = require("./getAllBatch");

router.use(getAllBatch);
router.use(addBatch);
router.use(updateBatch);
router.use(deleteBatch);


module.exports = router;
