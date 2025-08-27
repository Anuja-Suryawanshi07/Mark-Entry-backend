const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { BATCH_TABLE } = require("../../config");

// http://localhost:7777/batch/batch?isActive=active

router.get("/batch", (req, res) => {
  const { isActive } = req.query;

  if (!isActive) {
    return res.status(400).json(errorResponse("Query parameter 'isActive' is required."));
  }

  let isActiveValue;
  if (isActive.toLowerCase() === "active") {
    isActiveValue = 1;
  } else if (isActive.toLowerCase() === "inactive") {
    isActiveValue = 0;
  } else {
    return res
      .status(400)
      .json(errorResponse("Select status active or inactive."));
  }

  const sql = `SELECT * FROM ${BATCH_TABLE} WHERE is_active = ?`;

  pool.query(sql, [isActiveValue], (error, results) => {
    if (error) {
      return res.status(500).json(errorResponse("Database query failed.", error));
    }

    if (results.length === 0) {
      return res.status(200).json(successResponse("No batches found with the given status."));
    }

    return res.status(200).json(successResponse(results));
  });
});

module.exports = router;
