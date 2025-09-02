const express = require("express");
const router = express.Router();
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE, STUDENT_GROUP_TABLE } = require("../../config");

// Get all students without a group
//http://localhost:7777/coordinator/students-without-group

router.get("/students-without-group", async (req, res) => {
  try {
    const [results] = await pool.promise().query(
      `SELECT * FROM ${STUDENT_TABLE} WHERE group_id IS NULL`
    );

    if (results.length === 0) {
      return res.status(200).json(successResponse("No students found without a group."));
    }

    return res.status(200).json(successResponse(results));
  } catch (error) {
    console.error("Error fetching students without group:", error);
    return res.status(500).json(errorResponse("Database query failed.", error));
  }
});

module.exports = router;