const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE, STUDENT_GROUP_TABLE } = require("../../config");

// Get all students by group name
//http://localhost:7777/coordinator/all-students-with-group?groupName=W1

router.get("/all-students-with-group", (req, res) => {
  const { groupName } = req.query;

  if (!groupName) {
    return res.status(400).json(errorResponse("Query parameter 'groupName' is required."));
  }

  const sql = `
    SELECT student_table.*, student_group_table.* FROM ${STUDENT_TABLE} student_table JOIN ${STUDENT_GROUP_TABLE} student_group_table ON student_table.group_id = student_group_table.group_id WHERE student_group_table.group_name = ?;
  `;

  pool.query(sql, [groupName], (error, results) => {
    if (error) {
      return res.status(500).json(errorResponse("Database query failed.", error));
    }

    if (results.length === 0) {
      return res.status(200).json(successResponse("No students found for the given group."));
    }

    return res.status(200).json(successResponse(results));
  });
});

module.exports = router;
