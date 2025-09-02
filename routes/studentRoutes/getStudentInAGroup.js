const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");
const { STUDENT_TABLE, STUDENT_GROUP_TABLE, COURSE_TABLE } = require("../../config");

/**
 * GET: Students in a particular group by Course
 * Endpoint: /student/by-group-course
 * Query Params:
 *   - groupId: ID of the group (required)
 *   - courseId: ID of the course (required)
 * 
 * Example:
 *   GET http://localhost:7777/student/by-group-course?groupId=1&courseId=2
 */
router.get("/by-group-course", (req, res) => {
  const { groupId, courseId } = req.query;

  // Validate query parameters
  if (!groupId || !courseId) {
    return res
      .status(400)
      .send(errorResponse("Both groupId and courseId are required as query params."));
  }

  // SQL query to fetch students with their group and course details
  const sql = `
    SELECT 
      s.student_id, 
      s.student_name, 
      s.batch_id, 
      s.group_id, 
      s.course_id,
      g.group_name, 
      c.course_name
    FROM ${STUDENT_TABLE} s
    INNER JOIN ${STUDENT_GROUP_TABLE} g ON s.group_id = g.group_id
    INNER JOIN ${COURSE_TABLE} c ON s.course_id = c.course_id
    WHERE s.group_id = ? AND s.course_id = ?
    ORDER BY s.student_id
  `;

  // Execute query
  pool.query(sql, [groupId, courseId], (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error.message));
    }

    if (results.length === 0) {
      return res.send(successResponse("No students found in this group for the selected course."));
    }

    return res.send(successResponse(results));
  });
});

module.exports = router;
