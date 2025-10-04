const express = require("express");
const router = express.Router();

const { successResponse, errorResponse } = require("../../utils/apiResponse");


// Get all students by course name
router.get("/all-students-with-course", (req, res) => {
  const { courseName } = req.query;

  if (!courseName) {
    return res.status(400).json(errorResponse("Query parameter 'courseName' is required."));
  }

  const sql = `
    SELECT student_table.*, course_table.*, student_group_table.* FROM ${STUDENT_TABLE} student_table JOIN ${STUDENT_GROUP_TABLE} student_group_table ON student_table.group_id = student_group_table.group_id JOIN ${COURSE_TABLE} course_table ON student_group_table.course_id = course_table.course_id WHERE course_table.course_name = ?;
  `;

  pool.query(sql, [courseName], (error, results) => {
    if (error) {
      return res.status(500).json(errorResponse("Database query failed.", error));
    }

    if (results.length === 0) {
      return res.status(200).json(successResponse("No students found for the given course."));
    }

    return res.status(200).json(successResponse(results));
  });
});

module.exports = router;

