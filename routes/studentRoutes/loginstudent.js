const express = require("express");
const pool = require("../../config/db");
const router = express.Router();

// POST: Student Login
// Example: POST http://localhost:7777/student/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ status: "Error", message: "Email and password are required" });
  }

  // Step 1: Check if user exists with role_id = 5 (student)
  const sql = `
    SELECT u.user_id, u.first_name, u.last_name, u.email, u.password, s.student_id, s.group_id
    FROM user u
    INNER JOIN student s ON u.user_id = s.user_id
    WHERE u.email = ? AND u.role_id = 5
  `;

  pool.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }

    const user = results[0];

    // Step 2: Check password (plain text check for now ⚠️)
    if (user.password !== password) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }

    // Step 3: Login success
    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      user: {
        user_id: user.user_id,
        student_id: user.student_id,
        student_name: user.student_name,
        email: user.email,
        group_id: user.group_id,
      },
    });
  });
});

module.exports = router;
