const express = require("express");
const pool = require("../../config/db");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const router = express.Router();

// POST: Student Login
// Example: POST http://localhost:7777/student/login
/*
 {
    "email":  "neeru1@example.com",
    "password": "neeru123"
}
 */

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ status: "Error", message: "Email and password are required" });
  }

  // Hash the plain-text password entered by user
  const hashPassword = String(crypto.SHA256(password.trim()));

  // Step 1: Find user with role_id = 5 (student)
  const sql = `
    SELECT u.user_id, u.first_name, u.last_name, u.email, u.password, s.student_id, s.group_id
    FROM user u
    INNER JOIN student s ON u.user_id = s.user_id
    WHERE u.email = ? AND u.role_id = 5
  `;

  pool.query(sql, [email.trim()], (err, results) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }

    const user = results[0];

    // Step 2: Compare hashed password with stored hash
    if (user.password !== hashPassword) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }

    // Step 3: Build JWT payload
    const payload = {
      userId: user.user_id,
      role: user.role_id,
      studentId: user.student_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      groupId: user.group_id,
    };

    // Step 4: Generate JWT
    const token = jwt.sign(payload, SECRET_KEY);

    // Step 5: Success response
    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        student_id: user.student_id,
        student_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        group_id: user.group_id,
      },
    });
  });
});

module.exports = router;
