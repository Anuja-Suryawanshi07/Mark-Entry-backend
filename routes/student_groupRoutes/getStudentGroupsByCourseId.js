const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const { successResponse, errorResponse } = require("../../utils/apiResponse");

// GET all student groups by course ID
// Example: GET http://localhost:7777/student_groups/course/1
router.get("/course/:courseId", (req, res) => {
  const { courseId } = req.params;

  const sql = `SELECT * FROM student_group WHERE course_id = ?`;

  pool.query(sql, [courseId], (error, results) => {
    if (error) {
      return res.status(500).send(errorResponse(error.message));
    }

    if (results.length === 0) {
      return res.send(successResponse(`No student groups found for course ID ${courseId}.`));
    }

    return res.send(successResponse(results));
  });
});

module.exports = router;
