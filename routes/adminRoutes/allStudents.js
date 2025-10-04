const express = require("express");

const router = express.Router();

/*
 * GET: Admin can view all registered students with optional filters
 * URL: http://localhost:7777/admin/allStudents

 * Examples:
 *   GET /admin/allStudents                     → All students
 *   GET /admin/allStudents?batch_id=2         → Students in batch 2
 *   GET /admin/allStudents?course_id=3        → Students in course 3
 *   GET /admin/allStudents?batch_id=2&course_id=3&filter=no-prn
 */
router.get("/allStudents", (req, res) => {
  const { batch_id, course_id, filter } = req.query;

  // Base SQL to fetch all students with joined user, batch and course details
  let sql = `
    SELECT 
      s.student_id,
      s.prn_number,
      CONCAT(u.first_name, ' ', u.last_name) AS student_name,
      u.email,
      u.mobile_number,
      s.group_id,
      s.created_at,
      s.updated_at,
      s.batch_id,
      b.batch_name,
      s.course_id,
      c.course_name
    FROM student s
    INNER JOIN user u ON s.user_id = u.user_id
    LEFT JOIN batch b ON s.batch_id = b.batch_id
    LEFT JOIN course c ON s.course_id = c.course_id
    WHERE 1=1
  `;

  const params = [];

  // Apply batch filter
  if (batch_id) {
    sql += " AND s.batch_id = ?";
    params.push(batch_id);
  }

  // Apply course filter
  if (course_id) {
    sql += " AND s.course_id = ?";
    params.push(course_id);
  }

  // Apply PRN filter
  if (filter === "no-prn") {
    sql += " AND s.prn_number IS NULL";
  }

  // Order by student_id ascending
  sql += " ORDER BY s.student_id ASC";

  pool.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    return res.status(200).json({
      status: "Success",
      total_students: result.length,
      students: result,
    });
  });
});

module.exports = router;
