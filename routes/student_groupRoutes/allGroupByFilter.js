const express = require("express");

const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");


/**
 * GET Student Groups
 * Endpoint: http://localhost:7777/student_group

 * Examples:
 *   GET /student_group                          → all groups
 *   GET /student_group?groupId=1                → single group by ID
 *   GET /student_group?courseId=2               → groups in a course (by ID)
 *   GET /student_group?course=DAC               → groups in a course (by Name)
 *   GET /student_group?batch=0323               → groups in a batch
 *   GET /student_group?course=DAC&batch=0323    → filter by both
 */

router.get("/", (req, res) => {
  const { groupId, courseId, course, batch } = req.query;

  let sql = `
    SELECT sg.group_id, sg.group_name, sg.course_id, c.course_name, b.batch_name
    FROM ${STUDENT_GROUP_TABLE} sg
    LEFT JOIN course c ON sg.course_id = c.course_id
    LEFT JOIN batch b ON c.batch_id = b.batch_id
    WHERE 1=1
  `;
  const params = [];

  if (groupId) {
    sql += " AND sg.group_id = ?";
    params.push(groupId);
  }

  if (courseId) {
    sql += " AND sg.course_id = ?";
    params.push(courseId);
  }

  if (course) {
    sql += " AND c.course_name = ?";
    params.push(course);
  }

  if (batch) {
    sql += " AND b.batch_name = ?";
    params.push(batch);
  }

  pool.query(sql, params, (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error.message));
    }

    if (results.length === 0) {
      return res.send(successResponse("No student groups found."));
    }

    return res.send(successResponse(results));
  });
});

module.exports = router;
