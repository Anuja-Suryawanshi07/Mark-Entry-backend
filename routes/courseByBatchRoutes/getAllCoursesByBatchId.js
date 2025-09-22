const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { COURSE_TABLE, BATCH_TABLE } = require("../../config");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// GET: get courses by batch ID
// http://localhost:7777/course/get-course-by-batch/:batchId

router.get("/get-course-by-batch/:batchId", (req, res) => {
  let { batchId } = req.params;

  batchId = Number.parseInt(batchId);
  if (Number.isNaN(batchId) || batchId < 0) {
    return res.status(400).send(errorResponse("Invalid batch Id"));
  }

  const sql = `SELECT course_table.*, batch_table.* FROM ${COURSE_TABLE} course_table JOIN ${BATCH_TABLE} batch_table ON course_table.batch_id = batch_table.batch_id WHERE course_table.batch_id = ?;`;

  pool.query(sql, [batchId], (error, result) => {
    if (error) {
      return res.status(500).send(errorResponse(error));
    }

    if (result.length === 0) {
      return res
        .status(404)
        .send(errorResponse("No Course found with this batch ID: " + batchId));
    }
    return res.status(200).send(successResponse(result));
  });
});

module.exports = router;
