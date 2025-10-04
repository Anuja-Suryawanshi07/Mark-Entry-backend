const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");



//http://localhost:7777/admin/all-batch

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

//http://localhost:7777/admin/add-batch
router.post("/add-batch", (req, res) => {
  let { batchName, isActive } = req.body;
  
  const sql = `INSERT INTO ${BATCH_TABLE} ( batch_name, is_active ) VALUES (?, ?)`;

  if (!batchName) {
    return res
      .status(400)
      .json(errorResponse("Batch Name field should not empty."));
  }

  if (typeof batchName !== "string" || batchName === "") {
    return res.status(400).json(errorResponse("Invalid course name"))
  }

  if (isActive !== 1 && isActive !== 0) {
    return res.status(400).json(errorResponse("Invalid is active field"))
  }
 
  const checkBatchName = `select * from batch where batch_name=?`

   pool.query(checkBatchName, [batchName], (checkBatchError, checkBatchResult) =>{
     if (checkBatchError) {
          return res.status(500).send(errorResponse(checkBatchError));
        }
        if (checkBatchResult.length > 0) {
      return res.status(400).json(errorResponse(
        "Batch name already registered"
      ));
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
});

//http://localhost:7777/admin/update-batch-status/7
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
