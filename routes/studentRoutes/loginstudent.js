// routes/studentRoutes/loginstudent.js
const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

// POST: Student login
// Example: POST http://localhost:7777/student/login
router.post("/login", (req, res) => {
  const { prn_number, password } = req.body || {};

  if (!prn_number || !password) {
    return res
      .status(400)
      .json({ status: "Error", message: "PRN number and password are required" });
  }

  const sql = `
    SELECT s.student_id, s.prn_number, s.group_id, u.user_id, u.first_name, u.last_name
    FROM student s
    JOIN user u ON s.user_id = u.user_id
    WHERE s.prn_number = ? AND u.password = ?
  `;

  pool.query(sql, [prn_number, password], (err, results) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ status: "Error", message: "Invalid PRN or password" });
    }

    return res.status(200).json({ status: "Success", data: results[0] });
  });
});

module.exports = router;
