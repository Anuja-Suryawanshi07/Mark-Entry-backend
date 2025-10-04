const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");



router.get("/all-batch-isActive", (req, res) => {
  const sql = `SELECT * FROM ${BATCH_TABLE} where is_active=1`;

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
