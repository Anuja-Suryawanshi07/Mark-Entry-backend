const express = require("express");
const router = express.Router();

const addBatch = require("./addBatch");
const deleteBatch = require("./deleteBatch");
const updateBatch = require("./updateBatch");
const updateBatchStatus = require("./updateBatchStatus");
const getAllBatch = require("./getAllBatch");
const getBatchById = require("./getBatchById");
const getBatchByStatus = require("./getBatchByStatus");


router.use(getAllBatch);
router.use(getBatchById);
router.use(getBatchByStatus);
router.use(addBatch);
router.use(updateBatch);
router.use(updateBatchStatus);
router.use(deleteBatch);


module.exports = router;
