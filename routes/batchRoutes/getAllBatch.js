const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { BATCH_TABLE } = require("../../config");

router.get("/all-batch", (req, res) => {
  const sql = `SELECT * FROM ${BATCH_TABLE}`;

  pool.query(sql, (error, results) => {
    if (error) {
      return res.send(errorResponse(error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No Such Batches."));
    }
    return res.send(successResponse(results));
  });
});

module.exports = router;