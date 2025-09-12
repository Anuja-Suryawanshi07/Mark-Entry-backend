const express = require("express");
const pool = require("../../config/db");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { SECRET_KEY } = require("../../config");

// POST: Staff Login
// Example: POST http://localhost:7777/staff/login
/*
{
  "email": "alok@example.com",
  "password": "alok123"
}
*/

router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      status: "Error",
      message: "Email and password are required"
    });
  }

  // Hash entered password to compare
  const hashPassword = String(crypto.SHA256(password.trim()));

  const sql = `
    SELECT u.user_id, u.first_name, u.last_name, u.email, u.password, u.role_id,
           s.staff_id, s.staff_name, s.course_id, r.role_name
    FROM user u
    INNER JOIN staff s ON u.user_id = s.user_id
    INNER JOIN role r ON u.role_id = r.role_id
    WHERE u.email = ?
  `;

  pool.query(sql, [email.trim()], (err, result) => {
    if (err) {
      return res.status(500).json({ status: "Error", message: err.message });
    }

    if (result.length === 0) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password!" });
    }

    const user = result[0];

    // Compare hashed password
    if (user.password !== hashPassword) {
      return res.status(401).json({ status: "Error", message: "Invalid email or password!" });
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

    return res.status(200).json({
      status: "Success",
      message: "Login Successful",
      token,
    });
  });
});

module.exports = router;
