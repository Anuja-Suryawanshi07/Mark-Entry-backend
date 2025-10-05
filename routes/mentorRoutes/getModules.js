// routes/mentorRoutes/getModules.js
const express = require("express");
const pool = require("../../config/db");
const { successResponse, errorResponse } = require("../../utils/apiResponse");

const router = express.Router();

// GET all modules for a mentor (staffId + batchId + courseId)
router.get("/modules/:staffId/:batchId/:courseId", (req, res) => {
  const { staffId, batchId, courseId } = req.params;

  const sql = `
    SELECT DISTINCT m.module_id, m.module_name
    FROM module m
    INNER JOIN marks mk ON mk.module_id = m.module_id
    INNER JOIN student s ON s.student_id = mk.student_id
    WHERE mk.staff_id = ? AND s.batch_id = ? AND s.course_id = ?
  `;

  pool.query(sql, [staffId, batchId, courseId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json(errorResponse("Database Error", err));
    }
    return res.status(200).json(successResponse(results, "Modules fetched successfully"));
  });
});

module.exports = router;
