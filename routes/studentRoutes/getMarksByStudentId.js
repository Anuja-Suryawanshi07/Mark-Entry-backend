const express = require("express");
const pool = require("../../config/db"); // adjust path if needed
const router = express.Router();

// GET marks of a student by studentId
// URL: /student/show-mark/:studentId
router.get("/marks/:studentId", (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ status: "Error", message: "Student ID is required" });
  }

  const sql = `
  SELECT 
    s.student_id,
    s.roll_number,
    s.prn_number,
    mod_table.module_name,
    m.lab_test_marks,
    m.mcq_marks,
    m.assignment_marks,
    m.total_marks,
    m.exam_date
  FROM student AS s
  LEFT JOIN marks AS m ON s.student_id = m.student_id
  LEFT JOIN module AS mod_table ON m.module_id = mod_table.module_id
  WHERE s.student_id = ?
`;


  pool.query(sql, [studentId], (err, result) => {
    if (err) return res.status(500).json({ status: "Error", message: err.message });
    if (result.length === 0) return res.status(404).json({ status: "Error", message: "Student not found" });

    return res.status(200).json({ status: "Success", data: result });
  });
});

module.exports = router;
