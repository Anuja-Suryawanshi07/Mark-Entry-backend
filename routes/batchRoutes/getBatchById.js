const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");


//http://localhost:7777/batch/:batchId
router.get("/batch/:batchId", (req, res) => {
  const { batchId } = req.params;

  if (!batchId) {
    return res.send(errorResponse("Batch ID is required."));
  }

  const sql = `SELECT * FROM ${BATCH_TABLE} WHERE batch_id = ?`;

  pool.query(sql, [batchId], (error, results) => {
    if (error) {
      return res.send(errorResponse("Database query failed.", error));
    }

    if (results.length === 0) {
      return res.send(successResponse("No such batch found."));
    }

    return res.send(successResponse(results[0]));
  });
});

module.exports = router;

