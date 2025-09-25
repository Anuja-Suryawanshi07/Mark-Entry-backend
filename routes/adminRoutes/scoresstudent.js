const express = require("express");
const router = express.Router();
const pool = require("../../config/db-promise");
const { successResponse, errorResponse } = require("../../utils/stdResponse");

// GET all student scores
router.get("/stud-marks", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.student_name, c.course_name, m.module_name, 
              mk.theory_marks, mk.lab_marks, mk.IA_1, mk.IA_2
       FROM student s
       LEFT JOIN marks mk ON s.student_id = mk.student_id
       LEFT JOIN module m ON mk.module_id = m.module_id
       LEFT JOIN course c ON m.course_id = c.course_id
       ORDER BY s.student_name, c.course_name, m.module_name `
    );

    if (!rows.length) return res.status(404).json(errorResponse("No marks found"));

    // ✅ Return actual rows in the response
    res.json(successResponse("Student scores fetched successfully", rows));
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json(errorResponse(err.message));
  }
});

module.exports = router;