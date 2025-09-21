const express = require("express");
const pool = require("../../config/db");
const router = express.Router();
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config')
// POST: Staff Login
// Example: POST http://localhost:7777/staff/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ status: "Error", message: "Email and password are required" });
  }

  // Step 1: Check if user exists with role_id = 4 (staff)
  const sql = `
    SELECT u.user_id, u.first_name, u.last_name, u.email, u.password,r.role_name,
           s.staff_id, s.staff_name, s.course_id
    FROM user u
    INNER JOIN staff s ON u.user_id = s.user_id
    INNER JOIN role r ON s.role_id = r.role_id
    WHERE u.email = ?
  `;

  pool.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }

    const user = results[0];
    // Step 2: Check password
    if (user.password !== crypto.SHA256(password).toString()) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password" });
    }
    // Create JWT payload
    const payload = {
      userId: user.user_id,
      role: user.role_name,
      firstName: user.first_name,
      staffId: user.staff_id,
      staffName: user.staff_name,
      courseId: user.course_id,
    };

    // Generate JWT token
    const token = jwt.sign(payload, SECRET_KEY);


    // Step 3: Login success
    return res.status(200).json({
      status: "Success",
      message: "Login successful",
      token,
    });
  });
});

module.exports = router;
