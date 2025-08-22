const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// Mentor submits marks
// PUT: http://localhost:7777/mentor/submit-task/:markId
/* example:
  http://localhost:7777/mentor/submit-task/4
  request: {
  "theory_marks": 45,
  "lab_marks": 40,
  "IA_1": 18,
  "IA_2": 20
  }
  response: {
    "status": "success",
    "data": "Task submitted successfully by mentor"
  }   
 */

router.put("/submit-task/:markId", (req, res) => {
  const { markId } = req.params;
  const { theory_marks, lab_marks, IA_1, IA_2 } = req.body;

  if (
    theory_marks == null ||
    lab_marks == null ||
    IA_1 == null ||
    IA_2 == null
  ) {
    return res.status(400).json(errorResponse("All marks must be provided"));
  }

  const sql = `
    UPDATE marks
    SET theory_marks = ?, lab_marks = ?, IA_1 = ?, IA_2 = ?, status = 'Submitted'
    WHERE mark_id = ?
  `;

  pool.query(sql, [theory_marks, lab_marks, IA_1, IA_2, markId], (error, result) => {
    if (error) {
      return res.status(500).json(errorResponse("Database Error", error));
    }
    if (result.affectedRows === 0) {
      return res.status(404).json(errorResponse("Task not found"));
    }
    return res
      .status(200)
      .json(successResponse("Task submitted successfully by mentor"));
  });
});

module.exports = router;
