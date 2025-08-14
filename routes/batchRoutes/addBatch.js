const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { BATCH_TABLE } = require("../../config");

//http://localhost:7777/batch/add-batch

router.post("/add-batch", (req, res) => {
  let { batchName, isActive } = req.body;
  const sql = `INSERT INTO ${BATCH_TABLE} ( batch_name, is_active ) VALUES (?, ?)`;

  if (!batchName) {
    return res
      .status(400)
      .json(errorResponse("Batch Name field should not empty."));
  }

  if (typeof isActive === "undefined" || isActive === null || isActive === "") {
    isActive = 0;
  }

  pool.query(sql, [batchName, isActive], (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json(errorResponse("An error occurred while adding the batch."));
    }
    return res.status(201).json(
      successResponse({
        message: "Batch added successfully.",
        batchId: result.insertId,
      })
    );
  });
});

module.exports = router;
