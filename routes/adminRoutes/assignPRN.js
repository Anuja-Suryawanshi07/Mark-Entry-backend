const express = require("express");

const router = express.Router();

/**
 * PUT: Assign PRN number to a student
 * URL: http://localhost:7777/admin/assign-prn
 * Body: { "student_id": 1, "prn_number": 500001 }
 * Logic:
 *   1. Check if student exists.
 *   2. Check if PRN number is already assigned to another student.
 *   3. Update the student's prn_number field.
 */

router.put("/assign-prn", (req, res) => {
  const { student_id, prn_number } = req.body || {};

  // ------------------------------
  // Step 0: Validate input
  // ------------------------------
  if (!student_id || !prn_number) {
    return res.status(400).json({
      status: "Error",
      message: "student_id and prn_number are required",
    });
  }

  // ------------------------------
  // Step 1: Check if student exists
  // ------------------------------
  const checkStudentSql = "SELECT * FROM student WHERE student_id = ?";
  pool.query(checkStudentSql, [student_id], (err, result) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "Student not found",
      });
    }

    // ------------------------------
    // Step 2: Check if PRN already exists
    // ------------------------------
    const checkPrnSql = "SELECT * FROM student WHERE prn_number = ?";
    pool.query(checkPrnSql, [prn_number], (err2, result2) => {
      if (err2) {
        return res.status(500).json({ status: "Error", message: err2.message });
      }

      if (result2.length > 0) {
        return res.status(400).json({
          status: "Error",
          message: "PRN number already assigned to another student",
        });
      }

      // ------------------------------
      // Step 3: Assign PRN to student
      // ------------------------------
      const updateSql = `
        UPDATE student 
        SET prn_number = ?, updated_at = CURDATE() 
        WHERE student_id = ?
      `;
      pool.query(updateSql, [prn_number, student_id], (err3, updateResult) => {
        if (err3) {
          return res.status(500).json({ status: "Error", message: err3.message });
        }

        return res.status(200).json({
          status: "Success",
          message: `PRN number ${prn_number} assigned successfully to student_id ${student_id}`,
        });
      });
    });
  });
});

module.exports = router;
