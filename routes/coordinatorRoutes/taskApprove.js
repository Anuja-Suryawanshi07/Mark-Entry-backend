
const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// Coordinator approves task
// PUT: http://localhost:5555/coordinator/approve-task/:markId
/* example: http://localhost:5555/coordinator/approve-task/4
   send empty json object {}
   will get response 
   {
    "status": "success",
    "data": "Task approved successfully by coordinator"
    }
 */
router.put("/approve-task/:markId", (req, res) => {
  const { markId } = req.params;

  const sql = `
    UPDATE marks
    SET status = 'Completed'
    WHERE mark_id = ?
  `;

  pool.query(sql, [markId], (error, result) => {
    if (error) {
       console.error("SQL Error:", error); 
      return res.status(500).json(errorResponse("Database Error", error));
    }
    if (result.affectedRows === 0) {
      return res.status(404).json(errorResponse("Task not found"));
    }
    return res
      .status(200)
      .json(successResponse("Task approved successfully by coordinator"));
  });
});

module.exports = router;
