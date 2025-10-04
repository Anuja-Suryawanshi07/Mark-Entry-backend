// routes/mentorRoutes/getGroups.js
const express = require("express");

const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

// GET all groups for a mentor (staffId + batchId + courseId + moduleId)
router.get("/groups/:staffId/:batchId/:courseId/:moduleId", (req, res) => {
  const { staffId, batchId, courseId, moduleId } = req.params;

  const sql = `
    SELECT DISTINCT g.group_id, g.group_name
    FROM student_group g
    INNER JOIN student s ON s.group_id = g.group_id
    INNER JOIN marks m ON m.student_id = s.student_id
    WHERE m.staff_id = ? AND s.batch_id = ? AND s.course_id = ? AND m.module_id = ?
  `;

  pool.query(sql, [staffId, batchId, courseId, moduleId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json(errorResponse("Database Error", err));
    }
    return res.status(200).json(successResponse(results, "Groups fetched successfully"));
  });
});

module.exports = router;
