// routes/mentorRoutes/getCourses.js
const express = require("express");

const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

// GET all courses for a mentor (staffId + batchId)
router.get("/courses/:staffId/:batchId", (req, res) => {
  const { staffId, batchId } = req.params;

  const sql = `
    SELECT DISTINCT c.course_id, c.course_name
    FROM course c
    INNER JOIN student s ON s.course_id = c.course_id
    INNER JOIN marks m ON m.student_id = s.student_id
    WHERE m.staff_id = ? AND s.batch_id = ?
  `;

  pool.query(sql, [staffId, batchId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json(errorResponse("Database Error", err));
    }
    return res.status(200).json(successResponse(results, "Courses fetched successfully"));
  });
});

module.exports = router;
