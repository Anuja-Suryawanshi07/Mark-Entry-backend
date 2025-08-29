const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { BATCH_TABLE } = require("../../config");

//http://localhost:7777/batch/update-batch-status/:batchId

router.put("/update-batch-status/:batchId", (req, res) => {
  const { batchId } = req.params;
  const { isActive } = req.body;

  const sql = `UPDATE ${BATCH_TABLE} SET is_active = ? WHERE batch_id = ?`;

  pool.query(sql, [isActive, batchId], (error, result) => {
    if (error) {
      // return res.send(error)
      return res
        .status(500)
        .json(errorResponse("An error occurred while updating the batch."));
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(errorResponse("No batch found with the given ID."));
    }

    return res.status(200).json(
      successResponse({
        message: "Batch Status updated successfully.",
        batchId: batchId,
      })
    );
  });
});

module.exports = router;
