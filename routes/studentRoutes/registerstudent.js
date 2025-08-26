// routes/studentRoutes/student_register.js
const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

// POST: Register a new student
// Example: POST http://localhost:7777/student/register
router.post("/register", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    mobile_number,
    password,
    roll_number,
    prn_number,
    group_id
  } = req.body || {};

  // Validate all required fields
  if (!first_name || !last_name || !email || !mobile_number || !password || !roll_number || !prn_number || !group_id) {
    return res.status(400).json({ status: "Error", message: "All fields are required" });
  }

  // Step 1: Insert into user table
  // const sqlUser = `
  //   INSERT INTO user (first_name, last_name, email, mobile_number, password)
  //   VALUES (?, ?, ?, ?, ?)
  // `;

   const sqlUser = `
    INSERT INTO user (first_name, last_name, email, mobile_number, password, role_id)
    VALUES (?, ?, ?, ?, ?, 1)
  `;

  pool.query(sqlUser, [first_name, last_name, email, mobile_number, password], (err, userResult) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    const user_id = userResult.insertId;

    // Step 2: Insert into student table
    const sqlStudent = `
      INSERT INTO student (roll_number, prn_number, group_id, user_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, CURDATE(), CURDATE())
    `;

    pool.query(sqlStudent, [roll_number, prn_number, group_id, user_id], (err2, studentResult) => {
      if (err2) {
        return res.status(500).json({ status: "Error", message: err2.message });
      }

      return res.status(201).json({
        status: "Success",
        message: `Student registered successfully with Student ID: ${studentResult.insertId}`,
        user_id,
      });
    });
  });
});

module.exports = router;
