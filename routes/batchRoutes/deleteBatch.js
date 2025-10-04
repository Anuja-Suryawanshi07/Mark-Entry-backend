const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");


//http://localhost:7777/batch/delete-batch/7

router.delete("/delete-batch/:batchId", (req, res) => {
  const { batchId } = req.params;

  const sql = `DELETE FROM ${BATCH_TABLE} WHERE batch_id = ?`;

  pool.query(sql, [batchId], (error, result) => {
    if (error) {
      console.error("SQL ERROR:", error);
      return res
        .status(500)
        .json(errorResponse("An error occurred while deleting the batch."));
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(errorResponse("No batch found with the given ID."));
    }

    return res.status(200).json(
      successResponse({
        message: "Batch deleted successfully.",
        batchId: batchId,
      })
    );
  });
});

module.exports = router;

