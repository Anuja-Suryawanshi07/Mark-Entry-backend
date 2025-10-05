const express = require("express");
const router = express.Router();
const pool = require("../../config/db-promise");
const { successResponse, errorResponse } = require("../../utils/stdResponse");

// GET all student scores
router.get("/stud-marks", async (req, res) => {
  const studentId  = req.user.student_id;
  try {
    const [rows] = await pool.query(
      `SELECT s.student_name, c.course_name, m.module_name,  g.group_name,
              mk.theory_marks, mk.lab_marks, mk.IA_1, mk.IA_2
       FROM student s
       LEFT JOIN student_group AS g ON s.group_id = g.group_id
       LEFT JOIN marks mk ON s.student_id = mk.student_id
       LEFT JOIN course c ON s.course_id = c.course_id
       LEFT JOIN module m ON m.course_id=c.course_id and (mk.module_id is null or mk.module_id = m.module_id)
       where s.student_id=?
       ORDER BY s.student_name, c.course_name, m.module_name`
    , [studentId]);

    if (!rows.length) return res.status(404).json(errorResponse("No marks found"));

    // ✅ Return actual rows in the response
    res.json(successResponse("Student scores fetched successfully", rows));
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json(errorResponse(err.message));
  }
});

module.exports = router;
