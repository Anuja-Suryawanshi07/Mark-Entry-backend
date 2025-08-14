const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


// (NEW) GET student group by ID
// Example: GET http://localhost:7777/student_group/1
router.get("/:groupId", (req, res) => {
  const { groupId } = req.params;
  const sql = `SELECT * FROM student_group WHERE group_id = ?`;

  pool.query(sql, [groupId], (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error.message));
    }

    if (results.length === 0) {
      return res.send(successResponse(`No student group found with ID ${groupId}.`));
    }

    return res.send(successResponse(results[0]));
  });
});

module.exports = router;
